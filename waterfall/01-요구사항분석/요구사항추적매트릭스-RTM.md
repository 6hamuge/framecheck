# 요구사항 추적 매트릭스 (RTM)

## 문서 정보

| 항목 | 내용 |
| --- | --- |
| 프로젝트 | FrameCheck |
| 문서 ID | RTM-FRAMECHECK-v0.2 |
| 작성일 | 2026-11-24 |
| 대상 릴리스 | 학회 실습용 MVP |
| 상태 | 기준선 승인 대기 · Phase 5 로컬 후보 연결 |
| 추적 기준 | SPD-FRAMECHECK-v0.1, BPD-FRAMECHECK-v0.1, SRS-FRAMECHECK-v0.1, UC-FRAMECHECK-v0.1 |

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
| --- | --- | --- |
| v0.1 | 2026-11-24 | MVP·정책·SRS·유스케이스·수용 기준의 초기 연결 작성 |
| v0.2 | 2026-11-25 | 로컬 후보와 모듈·구현·테스트 및 결과 연결 |

## 1. 목적과 추적 범위

Phase 0의 포함 범위 `MVP-001~006`과 개별 정책을 Phase 1의 기능·비기능 요구사항과 수용 기준으로 연결한다. 이후 단계에서 설계 위치, 구현 근거, 테스트 케이스, 실행 결과를 같은 행에 기록한다. 제외 범위 `EX-001~003`과 기획서의 실습 KPI는 제품 범위·가설 검토에 사용한다. 개별 기능의 테스트 판정에는 SRS의 AC를 사용한다.

## 2. 상태 정의

| 상태 | 의미 |
| --- | --- |
| P1 · 초안 | MVP 필수 요구사항이며 G1 검토 전이다. |
| 설계·구현 연결 | 모듈 ID와 후보 구현 파일을 참조한다. |
| TC 연결 | SRS 수용 기준과 로컬 후보를 검증한 케이스를 참조한다. |
| 부분 검증 | 실행한 검사는 통과했고 일부 대상 환경의 확인이 남아 있다. |

## 3. 기능 요구사항 추적 매트릭스

| FR-ID · 이름 | 기획·정책 출처 | 우선순위 · 상태 | UC · 수용 기준 | 설계·구현 | 테스트 케이스 | 판정·증빙 |
| --- | --- | --- | --- | --- | --- | --- |
| FR-001 · 로컬 영상 열기 | MVP-001 / BP-INPUT-001, BP-INPUT-002, BP-INPUT-003, BP-STATE-002 | P1 · 초안 | UC-001 / AC-001 | MOD-001, MOD-002 · app.js | TC-FN-INPUT-001, TC-FN-INPUT-002, TC-FN-INPUT-003 | 통과 · TRP-FRAMECHECK-v0.2 |
| FR-002 · 샘플로 시작 | MVP-001 / BP-SAMPLE-001 | P1 · 초안 | UC-001, UC-005 / AC-002 | MOD-001, MOD-002 · app.js | TC-FN-SAMPLE-001 | 통과 · TRP-FRAMECHECK-v0.2 |
| FR-003 · 프레임 선택·동기화 | MVP-002 / BP-COMPARE-001 | P1 · 초안 | UC-002 / AC-003 | MOD-001, MOD-002 · app.js | TC-FN-FRAME-001 | 통과 · TRP-FRAMECHECK-v0.2 |
| FR-004 · 영역 지정·확대 | MVP-003, MVP-006 / BP-COMPARE-002 | P1 · 초안 | UC-003 / AC-004 | MOD-003 · app.js | TC-FN-REGION-001, TC-FN-REGION-002 | 통과 · TRP-FRAMECHECK-v0.2 |
| FR-005 · 해상도·JPEG 변환 | MVP-004 / BP-COMPARE-003 / DESIGN.md · Inputs & Forms | P1 · 초안 | UC-004 / AC-005 | MOD-003 · app.js | TC-FN-REGION-002, TC-FN-JPEG-001 | 통과 · TRP-FRAMECHECK-v0.2 |
| FR-006 · 비교 PNG 다운로드 | MVP-005 / BP-EXPORT-001, BP-EXPORT-002, BP-LOCAL-001 | P1 · 초안 | UC-005 / AC-006 | MOD-001, MOD-004 · app.js | TC-FN-EXPORT-001 | 통과 · TRP-FRAMECHECK-v0.2 |
| FR-007 · 갱신 상태 및 복구 | MVP-001, MVP-002, MVP-004, MVP-005 / BP-STATE-001, BP-STATE-002 | P1 · 초안 | UC-001, UC-002, UC-004, UC-005 / AC-007 | MOD-001~MOD-004 · app.js | TC-FN-STATE-001, TC-FN-STATE-002 | 통과 · TRP-FRAMECHECK-v0.2 |

FR-002의 UC-005 연결은 샘플 영상에서도 공통 저장 흐름을 끝까지 사용할 수 있는지 추적한다. 화면 컴포넌트의 기획·디자인 참조는 유스케이스에 기록한다.

## 4. 비기능 요구사항 추적 매트릭스

| NFR-ID · 이름 | 기획·정책 출처 | 우선순위 · 상태 | 적용 시나리오 · 수용 기준 | 설계·구현 | 테스트 케이스 | 판정·증빙 |
| --- | --- | --- | --- | --- | --- | --- |
| NFR-001 · 브라우저 내부 처리 | MVP-001, MVP-005 / BP-LOCAL-001 | P1 · 초안 | UC-001~UC-005 / AC-008 | MOD-002~MOD-004 · app.js | TC-NF-LOCAL-001 | 통과 · TRP-FRAMECHECK-v0.2 |
| NFR-002 · 작업 데이터 수명 | MVP-001 / BP-LOCAL-002 | P1 · 초안 | UC-001 / AC-009 | MOD-002~MOD-004 · app.js | TC-NF-LIFE-001 | 통과 · TRP-FRAMECHECK-v0.2 |
| NFR-003 · 반응형·호환성 | MVP-006, MVP-001 / BP-INPUT-001 / DESIGN.md · Responsive Behavior | P1 · 초안 | UC-001~UC-005 / AC-010 | MOD-001~MOD-003 · app.js, index.html, styles.css | TC-NF-COMPAT-001 | 부분 검증 · TRP-FRAMECHECK-v0.2 |
| NFR-004 · 접근 가능한 조작 | MVP-006 / BP-COMPARE-002, BP-STATE-002 / DESIGN.md · Buttons, Inputs & Forms, Responsive Behavior | P1 · 초안 | UC-001~UC-005 / AC-011 | MOD-001~MOD-003 · app.js, index.html, styles.css | TC-NF-A11Y-001 | 부분 검증 · TRP-FRAMECHECK-v0.2 |

## 5. 커버리지 요약

| 연결 | 전체 | 연결 완료 | 미연결 |
| --- | --- | --- | --- |
| MVP → 요구사항 | 6개 | 6개 | 0개 |
| 개별 비즈니스 정책 → 요구사항 | 13개 | 13개 | 0개 |
| 요구사항 → 출처·유스케이스 또는 적용 시나리오·수용 기준 | 11개 | 11개 | 0개 |
| 요구사항 → 설계 모듈 및 코드 위치 | 11개 | 11개 | 0개 |
| 요구사항 → 테스트 케이스 | 11개 | 11개 | 0개 |
| 요구사항 → 테스트 판정 및 증빙 | 11개 | 11개 | 0개 |

후보는 `2fe6da844819374df47fc44fa50fb5baaddc9d5b`이며 구현 위치는 `framecheck/dist/` 기준이다. 위의 연결 수는 문서 추적 상태다. AC-010·AC-011은 부분 검증이며, 환경 제한과 실행 증빙은 [테스트결과보고서](../05-테스트/테스트결과보고서.md)에 기록했다.

## 6. 미매핑 항목과 갱신 절차

| 시점 | 기록할 내용 | 담당 |
| --- | --- | --- |
| G1 검토 | G0 기준선과 각 MVP·정책·AC 연결을 확인하고 승인 근거를 기록한다. | 기획·요구사항 담당 |
| Phase 2 설계 | 해당 설계 문서의 절 또는 화면 ID와 REQ-DEC 항목의 결정 근거를 연결한다. | 설계 담당 |
| 구현 및 테스트 설계 | 모듈·커밋 또는 PR과 실제 TC-ID를 추가한다. 각 TC에서 관련 AC를 확인할 수 있게 한다. | 개발·검증 담당 |
| 테스트 실행 이후 | 검증 환경, 판정, 테스트 결과 보고서 또는 재현 자료를 연결한다. | 검증 담당 |

요구사항을 변경하면 출처 정책·유스케이스·수용 기준과 연결된 설계·코드·테스트의 영향을 확인한다. 변경 이유, 적용 문서 버전과 영향받는 ID를 변경 이력과 검토 기록에 남긴다.

## 7. 관련 문서

- [요구사항 명세서](요구사항명세서-SRS.md) 및 [유스케이스 명세서](유스케이스명세서.md)
- [서비스 기획서](../00-기획/서비스기획서.md), [비즈니스 정책서](../00-기획/비즈니스정책서.md), [DESIGN.md](../../DESIGN.md)
- [워터폴 가이드](../AGENTS.md) 및 [단계별 검토 체크리스트](../08-검토/단계별검토-체크리스트.md#phase-1-요구사항-검토)

## 얼굴 분석 확장 추적

위 수치와 후보 SHA는 기존 정적 비교 릴리스의 검증 기록이다. 아래는 변경된 로컬 코드와 신규 검증 범위다. 기존 11개와 신규 3개로 요구사항은 총 14개다.

| 요구사항 | 출처 | 유스케이스·수용 기준 | 코드·설계 | 검증 |
| --- | --- | --- | --- | --- |
| FR-008 | MVP-007 / BP-AI-001 | UC-006 / AC-012 | MOD-005 · face-analysis.js, app.js | TC-FN-FACE-001 |
| FR-009 | MVP-007 / BP-AI-002 | UC-006 / AC-013 | MOD-005 · face-analysis.js, app.js | TC-FN-FACE-001, TC-FN-FACE-002 |
| FR-010 | MVP-007 / BP-AI-003 | UC-006 / AC-014 | MOD-001·005 · app.js, face-analysis.js | TC-FN-FACE-003, TC-NF-FACE-001 |

[확장 검증 결과](../05-테스트/테스트결과보고서.md#4-얼굴-분석-확장-검증)에서 실행 상태를 확인한다.
