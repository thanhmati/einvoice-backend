## 🛠️ Tools Hỗ Trợ

### Development Tools
- **API Testing**: Swagger UI tại `http://localhost:3000/api/v1/docs`
- **Database**: MongoDB Compass cho GUI
- **Message Queue**: Kafka UI (có thể enable trong docker-compose)
- **Authentication**: Keycloak Admin tại `http://localhost:8180`
- **Monitoring**: Grafana Dashboard tại `http://localhost:3000` (admin/admin)
- **Log Search**: Loki API tại `http://localhost:3100`
- **Log Collection**: Promtail agent tự động thu thập logs từ Docker containers
- **Payment Testing**: Stripe CLI cho webhook testing
- **Cache Management**: Redis Insight tại `http://localhost:5540`

### Xem Sơ Đồ Mermaid
- **GitHub**: Tự động render Mermaid diagrams
- **VSCode**: Mermaid Preview extension
- **Online**: https://mermaid.live/

---

## 📞 Hỗ Trợ

### Nếu Gặp Vấn Đề
1. **Docker Issues**: Kiểm tra `docker ps` và logs
2. **Service Connection**: Verify network `einvoice-nw`
3. **Database**: Ensure MongoDB is running on port 27017
4. **Kafka**: Check Kafka broker health
5. **Logging Stack**: Verify Grafana (3000), Loki (3100), và Promtail services
6. **Log Collection**: Check Promtail is collecting container logs properly
7. **Stripe Integration**: Verify webhook configuration và signature verification

### Debugging
```bash
# Check running containers
docker ps

# View service logs
docker logs <container-name>

# Check network
docker network ls | grep einvoice

# MongoDB connection test
docker exec -it mongodb mongosh

# Check logging stack
docker logs grafana
docker logs loki
docker logs promtail

# Verify log collection
curl http://localhost:3100/ready
curl http://localhost:3100/metrics

# Test Stripe webhook (if using Stripe CLI)
stripe listen --forward-to localhost:3000/api/v1/payment/stripe/webhook
```

### Feedback & Contributions
- Góp ý cải thiện tài liệu
- Đề xuất bài tập mới
- Báo lỗi trong code examples
- Contribute to documentation

---

**Happy Teaching & Learning! 🎓🚀**

*Tài liệu này được cập nhật để phản ánh chính xác source code hiện tại. Mọi thắc mắc xin liên hệ để được hỗ trợ.*