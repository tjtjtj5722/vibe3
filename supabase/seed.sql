-- 목록 화면 확인용 샘플 콘텐츠
-- 같은 제목의 데이터가 있으면 다시 추가하지 않는다.

insert into public.items (
  title,
  region,
  summary,
  body,
  category,
  source_name,
  source_url,
  status,
  published_at
)
select
  sample.title,
  sample.region,
  sample.summary,
  sample.body,
  sample.category,
  '화면 확인용 샘플',
  'https://example.com',
  '게시',
  sample.published_at
from (
  values
    (
      '갱신 전에 확인할 다이렉트 보험 체크리스트',
      '서울',
      '자동차 보험 갱신 전에 살펴볼 기본 항목을 정리했습니다.',
      '운전자 범위, 주요 보장, 특약, 갱신 시점과 보험료를 차례로 확인하세요.',
      '갱신',
      now() - interval '1 day'
    ),
    (
      '처음 가입할 때 놓치기 쉬운 보장 항목',
      '부산',
      '첫 자동차 보험을 알아볼 때 확인할 내용을 소개합니다.',
      '보험료뿐 아니라 운전자 범위와 필요한 보장이 맞는지도 함께 살펴보세요.',
      '보장',
      now() - interval '3 days'
    ),
    (
      '보험료 비교 전에 준비하면 좋은 정보',
      '대구',
      '상담이나 견적 요청 전에 준비할 정보를 안내합니다.',
      '차량 유형과 보험 만료 예정일을 미리 확인하면 상담을 더 빠르게 진행할 수 있습니다.',
      '비용',
      now() - interval '6 days'
    ),
    (
      '운전자 범위를 정할 때 확인할 기준',
      '인천',
      '가족과 함께 운전하는 경우 확인할 기준을 정리했습니다.',
      '실제로 운전할 사람을 기준으로 운전자 범위와 연령 조건을 확인하세요.',
      '가입',
      now() - interval '9 days'
    )
) as sample(title, region, summary, body, category, published_at)
where not exists (
  select 1
  from public.items existing
  where existing.title = sample.title
);
