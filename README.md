## Eingesetzte Software
```text
nodejs Version: 20.15.1
nestjs Version: 10.4.2
npm Version: doc10.8.2
Docker Version: 24.0.6
mysql Version: 8.3.0
```
***

## Deine verwendete Software
```bash
node --version
```
```bash
nest --version
```
```bash
npm --version
```
```bash
docker --version
```
***

## Verwendete Ports
| Port | Verwendung |
|------|------------|
| 3000 | Backend    |
| 3306 | MySQL      |
| 8080 | PhpMyAdmin |
***

## Installation

```bash
docker-compose up -d
```

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

```bash
netstat -ano | findstr :3000
```

```bash
taskkill /PID 25168 /F
 ```

## Build the app

```bash
npm run build
```