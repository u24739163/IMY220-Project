# IMY220-Project Repo

#GitHub Link
https://github.com/u24739163/IMY220-Project

# Build the Docker image
docker build -t sudoApp .

# Run the container
docker run -p 3000:3000 sudoApp

# List running containers
docker ps

# Stop a running container
docker stop <id
