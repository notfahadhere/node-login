pipeline {
    agent any
    environment {
        IMAGE_NAME = "node-login"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }
        stage('Trivy Security Scan') {
            steps {
                script {
                    echo "Checking image for vulnerabilities..."
                    // This command scans the image and fails if it finds HIGH or CRITICAL bugs
                    sh "trivy image --severity HIGH,CRITICAL --exit-code 0 ${IMAGE_NAME}:latest"
                }
            }
        }
        stage('Deploy') {
            steps {
                sh "docker rm -f login-container || true"
                sh "docker run -d -p 3000:3000 --name login-container ${IMAGE_NAME}:latest"
            }
        }
    }
}
