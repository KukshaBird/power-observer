## Development setup

- Create a .env file in the root for app configuration
```dotenv
PORT=3878
API_TOKEN=test
TELEGRAM_BOT_TOKEN=token
TELEGRAM_CHAT_ID=-100000000
API_TIMEZONE=Europe/Kyiv
```

- Create a .env file for a database in /database directory

```dotenv
POSTGRES_PASSWORD=admin
POSTGRES_USER=admin
POSTGRES_DB=po_data
```

- Run docker compose up command:
```bash
docker compose -p po-dev -f docker-compose.dev.yml up -d
```
