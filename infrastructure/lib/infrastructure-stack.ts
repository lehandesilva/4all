import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as rds from "aws-cdk-lib/aws-rds";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "4allVpc", {
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          name: "Public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          name: "Private",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // Create secret for RDS
    const dbSecret = new Secret(this, "db-4all-master-secret", {
      secretName: "db-4all-master-secret",
      description: "Database master user credentials",
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: "postgres" }),
        generateStringKey: "password",
        passwordLength: 16,
        includeSpace: false,
        excludePunctuation: true,
        excludeCharacters: '"/@:',
      },
    });

    // Create secret for private key
    const privateKey = new Secret(this, "4allPrivateKey", {
      secretName: "4allPrivateKey",
      description: "Private key for 4all",
      generateSecretString: {
        generateStringKey: "password",
        passwordLength: 16,
        includeSpace: false,
        excludePunctuation: true,
      },
    });

    //Create security group for DB
    const dbSecurityGroup = new ec2.SecurityGroup(this, "4allDbSecurityGroup", {
      securityGroupName: "4allDbSecurityGroup",
      vpc: vpc,
    });
    dbSecurityGroup.addIngressRule(
      ec2.Peer.ipv4(vpc.vpcCidrBlock),
      ec2.Port.tcp(5432),
      "Allow access from VPC"
    );

    // Create RDS instance
    const rdsInstance = new rds.DatabaseInstance(this, "4allDatabase", {
      vpc: vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      securityGroups: [dbSecurityGroup],
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16,
      }),
      credentials: rds.Credentials.fromSecret(dbSecret),
      databaseName: "4all",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      storageType: rds.StorageType.GP2,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T4G,
        ec2.InstanceSize.MICRO
      ),
      allocatedStorage: 20,
      maxAllocatedStorage: 25,
      multiAz: false,
      backupRetention: cdk.Duration.days(0),
      deleteAutomatedBackups: true,
      publiclyAccessible: false,
    });

    dbSecret.attach(rdsInstance);

    // Create ECS cluster
    const cluster = new ecs.Cluster(this, "4allCluster", {
      vpc: vpc,
      clusterName: "4allCluster",
    });

    cluster.addCapacity("DefaultAutoScalingGroupCapacity", {
      instanceType: new ec2.InstanceType("t2.micro"),
      desiredCapacity: 1,
    });

    // Create ECS task definition
    const taskDef = new ecs.Ec2TaskDefinition(this, "4allTaskDef", {
      family: "4all-taskDEF",
      networkMode: ecs.NetworkMode.HOST,
    });

    taskDef.addContainer("4allContainer", {
      image: ecs.ContainerImage.fromEcrRepository(
        cdk.aws_ecr.Repository.fromRepositoryArn(
          this,
          "4all/backend",
          "arn:aws:ecr:eu-west-2:631640527929:repository/4all/backend"
        ),
        "latest"
      ),
      portMappings: [{ containerPort: 80 }],
      environment: {
        DB_HOST: rdsInstance.dbInstanceEndpointAddress,
        DB_PORT: rdsInstance.dbInstanceEndpointPort.toString(),
        DB_USER: dbSecret.secretName,
        DB_PASSWORD: dbSecret.secretValueFromJson("password").toString(),
        PRIVATE_KEY: privateKey.secretValueFromJson("password").toString(),
        NODE_ENV: "production",
        NEXT_PUBLIC_FRONTEND_ORIGIN: "*",
      },
      memoryLimitMiB: 512,
    });

    // Instantiate an Amazon ECS Service
    const ecsService = new ecs.Ec2Service(this, "4all-Service", {
      cluster: cluster,
      taskDefinition: taskDef,
    });

    // Create ALB
    const alb = new elbv2.ApplicationLoadBalancer(this, "4all-alb", {
      vpc,
      internetFacing: true,
    });
    const listener = alb.addListener("4all-alb-listener", {
      port: 80,
    });
    listener.addTargets("4all-alb-targets", {
      port: 80,
      targets: [
        ecsService.loadBalancerTarget({
          containerName: "4allContainer",
          containerPort: 80,
        }),
      ],
    });
  }
}
