pipeline { 
    agent any
    stages { 
        stage('Build') { 
            steps {   
                sh 'chmod 777 build.sh'
                sh './build.sh'
            } 
        }
    }
}
