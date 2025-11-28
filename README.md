# A simple MERN stack application 

# Read this 1st

In main branch the code is related to docker and docker compose 

```sh
git checkout main
```

# When you want to Kubernetize
Go to kuber/k8s branch 

```sh
git checkout kuber/k8s
```

Instead of:
    docker run for each container

You use:

    ```sh 
    kubectl apply -f *.yml
    ``` 
    to create/update Deployments, Services, PVCs

    ```sh
    kubectl get pods,svc,deploy
    ```
    to inspect

Kubernetes handles:

    1. Scheduling Pods on nodes
    2. Restarting failed containers
    3. Rolling updates (kubectl set image or change Deployment image and re-apply)
    4. Scaling (kubectl scale deployment api --replicas=4)

### Create a network for the docker containers

`docker network create demo`

### Build the client 

```sh
cd mern/frontend
docker build -t mern-frontend .
```

### Run the client

`docker run --name=frontend --network=demo -d -p 5173:5173 mern-frontend`

### Verify the client is running

Open your browser and type `http://localhost:5173`

### Run the mongodb container

`docker run --network=demo --name mongodb -d -p 27017:27017 -v ~/opt/data:/data/db mongo:latest`

### Build the server

```sh
cd mern/backend
docker build -t mern-backend .
```

### Run the server

`docker run --name=backend --network=demo -d -p 5050:5050 mern-backend`

## Using Docker Compose

`docker compose up -d`

