# FrameCheck 디자인 가이드

## Overview

FrameCheck는 영상 편집자가 **같은 프레임에서 해상도와 JPEG 품질에 따른 디테일 변화**를 확인하는 브라우저 도구다. 첫 화면은 샘플 프레임과 시작 버튼을 중심으로 구성한다. 영상을 열면 타임라인, 원본·변환 비교, 압축 설정, PNG 저장이 한 페이지에서 이어진다.

레퍼런스는 Walt Disney World의 데스크톱 홈페이지다. 2026년 11월 24일 관찰 당시, 넓은 시즌 사진과 짧은 제목으로 관심을 끌고 바로 아래의 밝은 패널에서 숙박·티켓 검색을 시작할 수 있었다. 아래쪽에는 옅은 배경 위에 이미지와 짧은 설명을 담은 카드가 이어졌다. FrameCheck는 이 순서를 **샘플 프레임 → 시작 동작 → 비교 작업 영역**에 적용한다. 아래 토큰 값은 FrameCheck용 설계값이다. [Walt Disney World 공식 홈페이지](https://disneyworld.disney.go.com/)

**Key Characteristics**

- 샘플 영상의 정지 프레임과 `내 영상 열기`, `샘플로 시작`을 첫 화면에 배치한다.
- 밝은 회색 페이지에 흰 작업 카드를 놓고 영상에는 어두운 배경을 사용한다.
- 원본과 변환 미리보기는 동일한 프레임과 영역을 같은 표시 크기로 보여준다.
- 주요 조작은 검은색, 영상 위 선택선은 어두운 외곽선을 두른 흰색으로 표시한다. 오류는 붉은색과 안내 문구로 표시한다.
- 해상도와 JPEG 품질을 각각 조절하고, 결과와 설정을 한 장의 PNG에 담는다.

시각 구현 기준은 [Stitch Monochrome Gallery Minimal](stitch_design_system_implementation/monochrome_gallery_minimal/DESIGN.md)이다. 아래 토큰을 FrameCheck의 한국어 라벨, 비교 카드, 오류 상태에 적용한다.

## Colors

### Brand & Accent

| Token | Value | Use |
| --- | --- | --- |
| `{colors.primary}` | `#000000` | 기본 버튼, 밝은 화면의 포커스 링 |
| `{colors.on-primary}` | `#FFFFFF` | 기본 버튼 텍스트 |
| `{colors.selection}` | `#FFFFFF` | 영상 위 선택 사각형. 어두운 외곽선과 함께 사용 |
| `{colors.error}` | `#BA1A1A` | 입력 오류 메시지. 오류 원인과 다음 동작을 텍스트로 표시 |

### Surface

| Token | Value | Use |
| --- | --- | --- |
| `{colors.canvas}` | `#F9F9F9` | 페이지 배경 |
| `{colors.surface}` | `#FFFFFF` | 작업 카드, 입력 필드, 보조 버튼 |
| `{colors.media}` | `#1B1B1B` | 영상 주변 여백과 선택 사각형의 외곽선 |

### Text

| Token | Value | Use |
| --- | --- | --- |
| `{colors.ink}` | `#1A1C1C` | 제목, 본문, 입력값 |
| `{colors.muted}` | `#5E5E5E` | 파일 제한, 타임스탬프, 픽셀 크기, 상태 안내 |

### Hairlines & Borders

- `{colors.hairline}` · `#DBDBDB`. 정보 카드의 1px 경계선.
- `{colors.control-border}` · `#7E7576`. 흰 배경에서 입력 가능한 영역을 식별하는 테두리.

## Typography

### Font Family

- **Display / Body / UI** · `system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`.
- **Numeric values** · 시간, 픽셀 크기, 설정값에는 `font-variant-numeric: tabular-nums`를 적용한다.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
| --- | --- | --- | --- | --- | --- |
| `{typography.hero-display}` | 32px / 모바일 26px | 700 | 1.25 | normal | 첫 화면 제목 |
| `{typography.section}` | 20px | 700 | 1.4 | normal | 프레임 압축 미리보기 등 작업 영역 제목 |
| `{typography.card-title}` | 18px | 600 | 1.4 | normal | 원본, 변환 미리보기 |
| `{typography.body}` | 16px | 400 | 1.5 | normal | 설명과 안내 |
| `{typography.button}` | 14px | 600 | 1.4 | normal | 버튼과 입력 라벨 |
| `{typography.caption}` | 14px | 400 | 1.5 | normal | 시간, 픽셀 크기, 파일 조건과 상태 |

### Principles

- 파일명, 시간, 크기는 실제 조작부 옆에 배치한다. 크기는 `1920 × 1080 px` 형식으로 표기한다.
- 버튼에는 행동을 나타내는 한국어를 쓴다. 입력 라벨은 값이 바뀌는 동안에도 유지한다.
- 한글 문장은 자연스럽게 줄바꿈하고, 타임스탬프와 픽셀 크기는 한 단위로 읽히게 한다.

## Layout

### Spacing System

| Token | Value | Use |
| --- | --- | --- |
| `{spacing.xs}` | 4px | 라벨과 보조 정보 사이 |
| `{spacing.sm}` | 8px | 서로 관련된 입력과 값 사이 |
| `{spacing.md}` | 16px | 카드 안쪽, 모바일 좌우 여백 |
| `{spacing.lg}` | 24px | 데스크톱 좌우 여백, 비교 카드 사이 |
| `{spacing.xl}` | 32px | 작업 그룹 사이, 모바일 시작 화면 세로 여백 |
| `{spacing.section}` | 48px | 데스크톱 시작 화면 세로 여백 |

### Grid & Container

- **콘텐츠 너비** · 좌우 여백을 제외한 최대 1120px.
- **시작 화면** · 데스크톱에서 설명과 버튼은 왼쪽, 샘플 프레임은 오른쪽에 놓는다.
- **작업 화면** · 파일 정보와 타임라인 → 두 프레임 카드 → 압축 설정과 PNG 저장 순서로 읽힌다. 비교 카드는 동일 너비이고 상단을 맞춘다.

### Whitespace Philosophy

시작 화면에서는 설명과 샘플 사이에 여백을 주고, 작업 화면에서는 시간·설정·해당 프레임을 함께 읽을 수 있도록 간격을 좁힌다. 카드 내부의 메타데이터와 확대 이미지 위치는 양쪽에서 일치시킨다.

## Elevation & Depth

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | `{colors.canvas}` | 페이지와 헤더 |
| Hairline | `{colors.surface}`와 1px `{colors.hairline}` | 타임라인·비교·설정 패널 |
| Media inset | `{colors.media}` | 프레임과 확대 이미지의 여백 |
| Selection overlay | `{colors.selection}`과 어두운 외곽선 | 밝고 어두운 프레임에서 영역 표시 |

## Shapes

### Border Radius Scale

| Token | Value | Use |
| --- | --- | --- |
| `{rounded.none}` | 0px | 선택 사각형과 내보낸 비교 이미지 |
| `{rounded.sm}` | 8px | 버튼, 입력, 카드 안 프레임 |
| `{rounded.lg}` | 12px | 작업 카드와 시작 화면 샘플 프레임 |

### Media Geometry

- 시작 화면에는 사용 권한을 확보한 샘플 클립의 실제 정지 프레임을 쓴다. 눈과 입 주변에 확대해 볼 만한 디테일이 있는 장면을 고른다.
- 작업 중에는 영상 비율을 유지하고 남는 공간을 `{colors.media}`로 채운다. 선택 위치는 여백을 제외한 영상 영역을 기준으로 계산한다.
- 원본과 변환본의 전체 프레임은 같은 표시 너비를, 두 확대 이미지는 같은 표시 배율을 사용한다. 실제 픽셀 크기는 이미지 아래에 각각 표시한다.

## Components

### Top Navigation

**`{component.app-header}`** · 콘텐츠 폭에 맞춰 `FrameCheck` 텍스트 워드마크를 왼쪽에 둔다. 시작 화면과 작업 화면에서 같은 위치를 사용한다.

### Buttons

| Token | Label | Treatment |
| --- | --- | --- |
| `{component.button-primary}` | `내 영상 열기` | 검은색 채움, 흰 텍스트, `{rounded.sm}` |
| `{component.button-secondary}` | `샘플로 시작` | 흰 배경, 검은색 텍스트와 테두리, `{rounded.sm}` |
| `{component.button-export}` | `비교 PNG 저장` | 기본 버튼 스타일. 두 프레임과 선택 영역의 최신 결과가 준비되면 활성화 |

버튼은 최소 44px 높이, 좌우 16px 안쪽 여백을 사용한다. 키보드 포커스는 2px 링과 2px 간격으로 표시한다. 저장할 비교 결과가 준비 중이면 버튼 가까이에 상태를 표시한다.

### Cards & Containers

**`{component.start-panel}`** · `압축 전후 프레임 비교` 제목 아래에 `해상도와 JPEG 품질을 바꿔 영상의 디테일을 확인하세요.`를 표시한다. 시작 버튼 아래에는 `MP4 · WebM / 최대 30초 · 50MB`와 `내 영상은 이 브라우저에서 처리됩니다.`를 둔다.

**`{component.frame-card}`** · 원본과 변환본에 공통으로 사용하는 카드다. 카드 제목 → 전체 프레임 크기 → 프레임 → 선택 영역 확대 이미지와 실제 크기 순서로 배치한다. 영역이 비어 있으면 원본 카드에 `프레임에서 비교할 영역을 드래그하세요.`를 표시한다. 영역을 선택하면 두 프레임의 같은 상대 위치에 선택선을 표시한다.

**`{component.compare-export}`** · PNG에서 동일한 두 영역을 나란히 배치한다. 각 패널에 원본·변환 라벨, 프레임 시점, 선택 영역의 실제 가로·세로 픽셀 수를 넣고, 변환에 적용한 해상도 비율과 JPEG 품질을 표기한다.

### AI 얼굴 분석

비교 카드 아래에 `얼굴 분석`과 `얼굴 전체`·`눈`·`입`을 둔다. 두 최신 비교 프레임이 준비되어야 분석할 수 있다. 눈은 흰 원, 입은 금색 사각형으로 표시하고, 텍스트로 눈·입의 평균 위치 차이를 원본 px와 원본 얼굴 너비 대비 비율로 제시한다. 모델 다운로드, 미검출, 로딩 실패와 재분석 안내는 버튼 근처에 표시한다.

### Inputs & Forms

| Token | Behavior |
| --- | --- |
| `{component.file-picker}` | 브라우저에서 재생 가능한 MP4·WebM을 연다. 파일을 읽는 동안 파일명 가까이에 `영상을 여는 중…`을 표시한다. |
| `{component.timeline}` | 파일명과 `현재 시점 / 전체 길이`를 슬라이더 곁에 표시한다. 시점을 바꾸면 두 프레임을 함께 갱신하고 기존 영역 선택을 지운다. |
| `{component.region-input}` | 원본 프레임에서 포인터·터치로 사각형을 그린다. 좌표·크기 입력으로도 같은 영역을 갱신할 수 있다. 값은 원본 프레임의 픽셀 기준이다. |
| `{component.compression-controls}` | `프레임 압축 미리보기` 아래에 `해상도`와 `JPEG 품질`을 둔다. 현재 해상도는 원본 대비 비율, 품질은 0–100 척도로 표시한다. 설정 변경 시 변환 카드만 갱신한다. |

갱신 중에는 카드 크기와 현재 포커스를 유지하고, 가까운 위치에 텍스트 상태를 표시한다. 타임라인과 설정에는 화면에 보이는 라벨을 연결하고, 로딩과 입력 오류는 보조 기술에도 전달한다.

| Condition | Message |
| --- | --- |
| 지원되지 않는 형식 | `MP4 또는 WebM 파일을 선택하세요.` |
| 용량 초과 | `50MB 이하의 영상을 선택하세요.` |
| 길이 초과 | `30초 이하의 영상을 선택하세요.` |
| 재생 실패 | `이 브라우저에서 영상을 열 수 없습니다. 다른 영상을 선택하거나 샘플을 사용해 보세요.` |

오류는 파일 열기 버튼 근처에 표시하고, `내 영상 열기`와 `샘플로 시작`을 다시 사용할 수 있게 한다.

## Do's and Don'ts

### Do

- 두 패널에 같은 프레임 시점, 같은 영상 영역, 같은 확대 배율을 적용한다.
- 해상도를 변경하면 변환 영역의 실제 픽셀 크기를 갱신한다. JPEG 품질 변경 시 픽셀 크기는 유지한다.
- 문서의 토큰을 CSS 사용자 정의 속성에 대응시키고, 카드와 버튼이 해당 속성을 참조하게 한다.
- 파일 형식과 크기 제한, 브라우저 내부 처리 안내를 영상 열기 동작 가까이에 둔다.

### Don't

- 프레임을 카드에 채우기 위해 잘라내거나 늘리는 처리.
- 원본과 변환 상태를 색상만으로 구분하는 라벨.
- 프레임보다 먼저 눈에 들어오는 장식용 배지, 자동 전환 이미지, 과한 그림자.
- 처리 중인 결과를 저장할 수 있게 하는 버튼 상태.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Mobile | 768px 미만 | 좌우 16px. 시작 동작을 샘플보다 먼저 표시하고 원본 → 변환 카드를 한 열로 쌓는다. 제목은 26px. |
| Desktop | 768px 이상 | 좌우 24px. 설명·샘플과 원본·변환 카드를 각각 두 열로 배치한다. 제목은 32px. |
| Wide desktop | 1168px 이상 | 콘텐츠 영역을 1120px에 맞추고 양쪽 여백을 늘린다. |

### Touch Targets

버튼과 주요 컨트롤의 터치 영역은 최소 44px 높이로 확보한다. 비교 영역 드래그는 프레임 안에서 처리하고, 카드 바깥 영역에서는 페이지를 스크롤할 수 있게 한다.

### Image Behavior

모바일에서도 두 카드의 영상 비율과 확대 배율을 일치시킨다. 화면 너비가 바뀔 때 표시 크기만 달라지고 선택 사각형의 영상 내 위치와 파일에 기록될 픽셀 크기는 유지된다.

## Iteration Guide

1. 한 번에 한 컴포넌트를 수정하고 해당 `{component.*}` 항목과 토큰을 확인한다.
2. 기본, 키보드 포커스, 처리 중, 오류 상태 중 해당하는 상태를 확인한다.
3. 데스크톱과 모바일에서 샘플과 로컬 영상으로 `영상 열기 → 시점 선택 → 영역 지정 → 설정 변경 → PNG 저장`을 끝까지 실행한다.
4. 해상도와 JPEG 품질을 독립적으로 바꾼다. 두 카드가 같은 시점과 영역을 보여주는지, PNG의 픽셀 크기가 각 카드의 표시값과 일치하는지 확인한다.

## Known Gaps

- Disney World 관찰 범위는 데스크톱 홈페이지다. 이 문서의 모바일 규칙은 FrameCheck용 설계다.
- FrameCheck의 샘플 클립과 화면은 구현 단계에서 실제 브라우저와 영상 파일로 확인해야 한다.
