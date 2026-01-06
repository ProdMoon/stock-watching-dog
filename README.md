# Stock Watching Dog

캐논 카메라 재고 놓칠 수 없다

V1 재고를 확인하고 슬랙 웹훅을 보내는 앱입니다.

## Prerequisites

- node
- .env file with WEBHOOK_URL
   - Compatible with Slack Webhook.
```bash
WEBHOOK_URL="https://hooks.slack.com/services/..."
```

## Installation

```bash
npm install
```

## Usage

### Manual Run

```bash
npm run monitor
```

### Setup Cron Job (runs every minute)

```bash
./setup-cron.sh
```

### View Logs

```bash
tail -f stock-monitor.log
```

### Remove Cron Job

```bash
crontab -l | grep -v 'stock-monitor.js' | crontab -
```

## Etc

- TARGET_URL과 OUT_OF_STOCK_PATTERN을 수정하여 다른 용도로도 활용할 수 있습니다.
- ~~캐논은 물량으로 장난하지 마라 ㅠㅠ~~