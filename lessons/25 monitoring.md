# Lesson: Monitoring trong Microservices

## 🎯 Learning Objectives

Sau bài học này, bạn sẽ nắm được: - Vai trò và tầm quan trọng của
Monitoring trong distributed systems\
- Các loại signals quan trọng: Metrics, Logs, Traces\
- Cách thiết kế một Observability stack hoàn chỉnh\
- Best practices khi triển khai monitoring cho microservices\
- Công cụ tiêu chuẩn trong industry

## ⚡ 1. Why Monitoring Matters in Microservices

Microservices có các đặc điểm: - Distributed\
- Stateful/Stateless mix\
- Network communication\
- Async messaging và event-driven patterns

Monitoring giúp bạn: - Phát hiện incident sớm\
- Debug cross-service issues\
- Hiểu performance bottlenecks\
- Tối ưu chi phí infrastructure\
- Đảm bảo SLO/SLI

## 🧩 2. Observability vs Monitoring

Observability = Metrics + Logs + Traces

## 📊 3. Metrics

Metrics quan trọng trong microservices:

### Application Metrics

-   Request throughput\
-   Latency\
-   Error rate\
-   Business metrics

### System Metrics

-   CPU, Memory\
-   Disk IO\
-   Network IO

## 🔍 4. Distributed Tracing

Distributed tracing giúp thấy toàn bộ request path qua nhiều services.

## 📜 5. Logging

Logging phải được centralized, sử dụng structured logs.

## 🏥 6. Health Checks

-   Liveness\
-   Readiness\
-   Startup

## 🚨 7. Alerting

Alert quan trọng cho on-call, gồm threshold alerts, anomaly alerts,
SLO-based alerts.

## 🌐 8. Service Mesh Observability

Istio/Linkerd cung cấp thêm traffic metrics, circuit breaker stats.

## 🏗 9. Infrastructure Monitoring

Theo dõi cluster, node, autoscaling, network policies.

## 🔄 10. Message Broker Monitoring

Kafka consumer lag, DLQ size, event throughput.

## 💡 11. Best Practices

-   Structured logs\
-   Correlate logs/metrics/traces\
-   Alert theo SLO\
-   Dashboards phục vụ Dev/SRE/Business

## 🧱 12. Modern Monitoring Stack Example

-   Prometheus\
-   Grafana\
-   OpenTelemetry + Jaeger\
-   Loki hoặc Elasticsearch\
-   Alertmanager
