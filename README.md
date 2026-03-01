#### Development setup

1. Create .env file in root for app configuration
```dotenv
PORT=3878
API_TOKEN=test
TELEGRAM_BOT_TOKEN=token
TELEGRAM_CHAT_ID=-100000000
API_TIMEZONE=Europe/Kyiv
```

2. Create .env file for database in /database directory

```dotenv
POSTGRES_PASSWORD=admin
POSTGRES_USER=admin
POSTGRES_DB=po_data
```

3. Run docker compose up command:
```bash
docker compose -p po-dev -f docker-compose.dev.yml up -d
```
