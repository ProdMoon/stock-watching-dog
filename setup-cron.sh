#!/bin/bash

# Stock Monitor Cron Setup Script
# Runs stock-monitor.js every minute

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NODE_PATH=$(which node)

# Cron job entry (runs every minute)
CRON_JOB="* * * * * cd $SCRIPT_DIR && $NODE_PATH stock-monitor.js >> $SCRIPT_DIR/stock-monitor.log 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "stock-monitor.js"; then
  echo "Cron job already exists. Removing old entry..."
  crontab -l | grep -v "stock-monitor.js" | crontab -
fi

# Add new cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "Cron job registered successfully!"
echo ""
echo "Cron entry:"
echo "$CRON_JOB"
echo ""
echo "Logs will be saved to: $SCRIPT_DIR/stock-monitor.log"
echo ""
echo "To remove the cron job, run:"
echo "  crontab -l | grep -v 'stock-monitor.js' | crontab -"

