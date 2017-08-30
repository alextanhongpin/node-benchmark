
job "ab" {
  datacenters = ["dc1"]

  type = "service"

  update {
    max_parallel = 1
    
    min_healthy_time = "10s"

    healthy_deadline = "3m"
    
    auto_revert = false
    
    canary = 0
  }

  group "benchmark" {
    count = 1

    restart {
      attempts = 10
      interval = "5m"
      delay = "25s"
      mode = "delay"
    }

    ephemeral_disk {
      size = 300
    }

    task "web" {
      driver = "docker"

      config {
        image = "alextanhongpin/ab-node-express"
        port_map {
          db = 8080
        }
      }

      resources {
        cpu    = 500 # 500 MHz
        memory = 256 # 256MB
        network {
          mbits = 10
          port "db" {}
        }
      }
    }
  }
}