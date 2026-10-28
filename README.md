# Julius Cessar Lapugot

**Senior Java Software Engineer** | High-Throughput Distributed Systems & Enterprise Architecture

[builtbyjuls.com](https://builtbyjuls.com) | [LinkedIn](https://www.linkedin.com/in/jlapugot) | [Resume](https://builtbyjuls.com/resume/jlapugot_resume.pdf) | [Email](mailto:juliusclapugot@gmail.com)

---

## Technical Identity

Senior Java Software Engineer with 9+ years of experience delivering high-throughput enterprise platforms across energy market, banking, and HR domains. Specialized in Java (8/11/17/21), Spring Boot microservices, PostgreSQL query optimization, distributed messaging (RabbitMQ), and resilient automated test gates.

- **50-90% Latency Reduction**: Redesigned PostgreSQL schema, query rewrites, and composite indexing for multi-tenant energy platforms.
- **90% Ingestion Latency Cut**: Optimized time-series pipeline via JDBC batching and parallel validation with 100% data integrity.
- **99.9% Production API Uptime**: Sustained high-availability customer-bank messaging services for hundreds of market participants.
- **20% to 80% Test Coverage**: Elevated automated test suites across trade-finance banking modules using JUnit, Mockito, and Testcontainers.

---

## Featured Engineering Projects

### 1. [`nplus1-ai-gate-starter`](https://github.com/builtbyjuls/nplus1-ai-gate-starter)

**JUnit 5 Test Gate for Hibernate N+1 Query Loops & AI-Driven Remediation**

- Catches accidental N+1 query cascades in automated test suites via datasource-proxy query interceptors.
- Executes isolated PostgreSQL `EXPLAIN (FORMAT JSON)` query plans inside rollback-safe JDBC savepoints.
- Generates compile-ready Java remediation suggestions using Spring AI and Redis caching.
- **Stack**: Java 21, Spring Boot, Spring AI, PostgreSQL, Testcontainers, Redis 7.

### 2. [`spring-modulith-strangler-bridge`](https://github.com/builtbyjuls/spring-modulith-strangler-bridge)

**Zero-Code Microservice Extraction, Runtime Slicing & Shadow Parity for Spring Modulith**

- Boots single-JAR worker slices (`--modulith.bridge.host-only`) while pruning foreign module beans and Hibernate JPA entities.
- Routes `@NamedInterface` contracts across `LOCAL`, `SHADOW`, and `REMOTE` modes with zero domain code changes and live runtime cutover.
- Verifies migration correctness on Java 21 Virtual Threads with scale-normalized `BigDecimal` shadow parity, rollback-safe dry-run writes, and CI-agnostic JUnit/JSON/Markdown reports.
- **Stack**: Java 21, Spring Boot 4.1, Spring Modulith 2.1, Hibernate 7, PostgreSQL 16 (Testcontainers), Docker, Kubernetes.

### 3. [`simplifeyn`](https://github.com/builtbyjuls/simplifeyn)

**Richard Feynman Technique PR Reviewer & Agent Skill**

- PR code reviewer and Agent Skill that explains complex architectural pull requests using the Richard Feynman mental model.
- Structures explanations through physical causality, tangible everyday analogies, audience calibration ladders, and edge-case ice-water tests.
- Available as a GitHub Action and portable AI skill.

---

## Core Competencies

| Domain                        | Technologies & Practices                                                         |
| :---------------------------- | :------------------------------------------------------------------------------- |
| **Languages & Core**          | Java (8, 11, 17, 21), SQL, TypeScript                                            |
| **Frameworks & Architecture** | Spring Boot, Spring Data JPA, Hibernate, REST APIs, Microservices, System Design |
| **Databases & Messaging**     | PostgreSQL, MariaDB, SQL Server, Redis, RabbitMQ, JDBC Batching                  |
| **Testing & Quality**         | JUnit 5, Mockito, Testcontainers, Integration Testing, Vitest                    |
| **DevOps & Cloud**            | Docker, Kubernetes, AWS (ECS, RDS, S3, SQS), Linux, CI/CD, Maven, Gradle         |

---

## Career Summary

- **Senior Java Software Engineer** - Exist Software Labs, Inc. (Jan 2020 - Oct 2025)
- **Software Engineer** - Exist Software Labs, Inc. (Apr 2016 - Dec 2019)
- **Education**: Bachelor of Science in Information Technology - Pamantasan ng Lungsod ng Valenzuela (2016)

---

## About This Repository (`builtbyjuls`)

This repository is both the GitHub Profile repository for `@builtbyjuls` and the source code for the personal portfolio at [builtbyjuls.com](https://builtbyjuls.com).

- **Framework**: Angular 21 with zoneless change detection and SSR/prerendering (`@angular/ssr`)
- **Styling**: Pure SCSS with high-contrast typography, responsive layout, and zero heavy UI libraries
- **Deployment**: Cloudflare Workers serving static prerendered assets with SPA fallback

### Local Development

```bash
npm ci
npm start
```

The local server runs at `http://localhost:4200`.

### Checks & Verification

```bash
npm run check
npm run format:check
```
