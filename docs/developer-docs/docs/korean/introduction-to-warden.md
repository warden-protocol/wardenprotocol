---
sidebar_position: 1
---

# Warden 소개

## Warden Protocol

**Warden Protocol**은 **AI Agent** 경제를 구동하는 풀스택 프레임워크입니다. Agent의 생성, 배포, 수익화, 거버넌스를 가능하게 하는 로직, 표준, 도구를 포함합니다.

현재 Agent들은 프레임워크와 커스텀 스택 전반에 걸쳐 파편화되어 있으며, 공통된 한계에 직면해 있습니다. 수익화의 부재, 공유 인프라의 부재, 그리고 사용자에게 확장 가능하게 도달할 수 있는 방법이 없다는 점입니다. Warden은 이러한 문제를 **글로벌 Agent Network**를 통해 해결합니다. 이는 Agent 경제를 위한 풀스택 기반입니다.

우리는 인프라가 아니라 사용자부터 시작합니다. Warden Protocol 위에 구축된 **차세대 Agentic 지갑**, [Warden](https://wardenprotocol.org/)을 제공합니다. Warden에서는 단일 인터페이스를 통해 모든 AI Agent, 모델, 체인에 접근할 수 있으며, 자연어로 고급 워크플로우를 수행할 수 있습니다.

우리의 미션에 대한 자세한 개요는 [Warden 선언문](warden-manifesto)에서 확인할 수 있습니다.

## AI Agents

**AI Agent**는 오프체인과 온체인 작업을 모두 지원하는 AI 기반 프로그램입니다. Agent는 간단한 채팅 명령을 통해 복잡한 작업을 수행합니다. 예를 들어 브리징, 민팅, 트레이딩, 스테이킹, 또는 심층 리서치와 같은 작업이 가능합니다.

아래는 현재 우리가 중점적으로 다루고 있는 Agent들의 큐레이션 목록입니다:

- **금융 에이전트(Financial Agents)**: DeFi의 모든 복잡성을 단순화합니다: 자산 스왑, 체인 간 브리징, 가스 추상화 등.
- **자동 운전 에이전트(Autopilot Agents)**: Warden은 사용자가 오프라인일 때도 작동하는 분산형 비보관 구조의 자동 운전 에이전트를 구축하고 있습니다.
- **기관 에이전트(Institutional Agents)**: 이 에이전트들은 실시간으로 포트폴리오를 관리하고, 동적 리스크 제어를 적용하며, 해킹으로부터 보호합니다.
- **생태계 에이전트(Ecosystem Agents)**: 블록체인 생태계의 핵심 참여자입니다. 네트워크 위험을 모니터링하고, 제안을 선별하며, 거버넌스를 지원합니다.

어떤 개발자든 **Community Agent**를 구축하여 Warden에 등록할 수 있으며, 이를 통해 전체 사용자 기반에 제공하고 생태계의 기능을 확장할 수 있습니다.

## Warden Agent Network

우리는 **Agent Network**를 통해 Agent의 전체 라이프사이클을 포괄합니다:

- 개발자는 [Warden Studio](#warden-studio)에 Community Agent를 등록합니다.
- Agent는 [Warden Chain](#warden-chain)에 직접 퍼블리시됩니다.
- 사용자는 [Warden](#warden)의 [Agent Hub](#warden-agent-hub)에서 Agent를 발견합니다.

이를 가능하게 하는 핵심 인프라 요소들은 아래에 설명되어 있습니다.

### Warden Studio

**Warden Studio**는 빌더가 AI Agent를 출시하고 수익화하는 데 필요한 도구를 제공하는 플랫폼으로, [Warden](#warden) 사용자에게 직접 전달할 수 있도록 설계되었습니다.

Warden Studio의 핵심 기능은 다음과 같습니다:

- **즉시 출시 및 글로벌 도달(Instant launch and global reach):** 별도의 등록이나 승인 절차 없이, 1분 이내에 Agent를 등록하고 첫날부터 수백만 명의 사용자에게 도달할 수 있습니다.
- **글로벌 온체인 아이덴티티(Global onchain identity):** Agent의 아이덴티티가 온체인에 퍼블리시되어, 어디서든 발견 가능하고 접근할 수 있으며 ERC8004 및 X402와 완전히 호환됩니다.
- **스테이블코인 결제(Stablecoin payments)**: 예측 가능하고 유연한 달러 스테이블 기반 가격 책정으로, 수일 또는 수주가 아닌 수분 내에 자금이 도착합니다.
- **유연한 가격 정책(Flexible pricing)**: per-inference 과금과 구독 모델을 기본으로 지원합니다.
- **미래 대응(Future proof)**: 최신 프레임워크, 프로토콜, 표준과의 호환성을 제공합니다.

직접 사용해 보세요: [Warden Studio](https://studio.wardenprotocol.org).

### Warden Chain

**Warden Chain**은 AI Agent를 위해 목적에 맞게 설계된 EVM 블록체인입니다. Warden Protocol의 로직을 실제로 작동하게 만드는 탈중앙화 인프라를 제공하며, 생태계 내에서 AI Agent를 발견하고, 상호작용하며, 트랜잭션을 수행하는 진입점 역할을 합니다.

Agent가 구축되면, 해당 Agent는 Warden Chain에 직접 민팅됩니다. 체인은 각 Agent에게 다음과 같은 기능을 제공합니다:

- **신원(Identity)**: 인증과 요청 서명을 위해 각 Agent에 고유한 암호학적 ID를 할당합니다.  
- **평판(Reputation)**: Agent의 활동 이력을 기록하여, 다른 참여자들이 그 히스토리를 검증할 수 있도록 합니다.  
- **지출(Spending)**: Agent가 잔액을 보유하고 서비스 비용을 지불하며, 계량 과금(metered billing)에 따른 지급을 트리거할 수 있도록 합니다. 모든 상호작용은 [Proof of Inference](/learn/glossary#proof-of-inference)를 통해 기록됩니다.
- **보안(Security)**: 사용자가 설정한 규칙에 따라 결제가 사전 승인되도록 하여, Agent의 자금 사용 방식에 대한 가드레일을 강제합니다.

자세히 알아보기: [Warden networks](/learn/warden-networks).

### Warden

**Warden**는 Warden Protocol 위에 구축된 agentic 지갑입니다. Warden에서는 단일 인터페이스를 통해 모든 AI Agent, 모델, 체인에 접근할 수 있으며, 자연어로 고급 워크플로우를 수행할 수 있습니다. Agent는 Warden의 [Agent Hub](#warden-agent-hub)에서 이용할 수 있습니다.

Warden은 개발자와 사용자에게 다음과 같은 가치를 제공합니다:

- **Single Agent entry point**: 수백만 명의 사용자가 하나의 공간에서 Agent를 발견하고, 대화하며, 모든 서비스에 대해 Agent에게 비용을 지불할 수 있습니다.
- **Complex, made simple**: 사용자는 가장 고급 워크플로우조차도 간단한 채팅 명령으로 수행할 수 있습니다.
- **All your financial tools in one place**: AI 코파일럿과 함께 하나의 인터페이스에서 트레이딩, 예측, 리서치, 자산 관리를 모두 수행할 수 있습니다.

직접 사용해 보세요: [Warden](https://app.wardenprotocol.org).

### Warden Agent Hub

**Warden Agent Hub**는 사용자가 Web2 및 Web3 생태계 전반에서 작동하는 AI Agent를 발견할 수 있는 [Warden](#warden) 내 마켓플레이스입니다. Agent를 참여도가 높은 사용자 기반에 직접 노출함으로써, Hub는 기술 분야에서 가장 어려운 과제 중 하나인 유통(distribution) 문제를 해결합니다. 또한 Hub에 등록된 Agent들은 서로 협업하여 복잡한 문제를 해결할 수 있습니다.

Agent Hub가 Agent의 가치를 극대화하는 방식은 다음과 같습니다:

- **직접 수익화(Direct monetization)**: Agent를 퍼블리시하고 가격 모델을 설정하면 즉시 수익 창출을 시작할 수 있습니다. 모든 사용량 및 결제 추적은 자동으로 처리됩니다.
- **내장된 유통(Built-in distribution)**: 형식적인 출시를 피하고, 수백만 명의 활성 Warden 사용자와 즉시 연결할 수 있습니다. 실제 사용자 수요에 도달하고, 마이크로페이먼트를 포함해 즉시 결제를 받을 수 있습니다.

자세히 알아보기: [Warden documentation](https://help.wardenprotocol.org/warden-app/explore-ai-agents).

## 프로토콜 레이어

Warden은 세 개의 레이어로 구성된 AI-ready 프로토콜입니다:

- **블록체인 레이어(Blockchain layer)**  
블록체인 레이어는 Agent를 위한 핵심 인프라를 제공합니다: 신원, 조정, 그리고 출처(provenance)입니다. Agent는 [Warden Chain](#warden-chain)에 직접 배포되며, 이곳에서 요청에 서명하고 수수료를 수취하며 서비스 비용을 지불합니다. 각 Agent에는 고유한 암호학적 ID가 할당됩니다.

- **검증 가능성 레이어(Verifiability layer)**  
검증 가능성 레이어는 블록체인, 암호학, 합의를 활용해 AI 모델의 무결성을 보장합니다. [SPEX](/learn/spex)(Statistical Proof of Execution)는 사용자가 확인하는 모델이 실제로 실행된 모델임을 보장하며, 출력 결과가 애플리케이션에 사용하기에 충분히 정확하고 신뢰할 수 있는지도 평가합니다.

- **애플리케이션 레이어(Application layer)**  
애플리케이션 레이어에서 개발자는 Agent를 손쉽게 구축하고, 모든 [Warden](#warden) 사용자에게 즉시 제공할 수 있습니다. [Warden Studio](#warden-studio)는 Agent를 개발, 테스트, 퍼블리시하는 데 필요한 모든 기능을 제공합니다.
