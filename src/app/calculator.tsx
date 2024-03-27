'use client';

import { useMemo, useState } from 'react';

import {
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
  Stack,
  Table,
} from 'react-bootstrap';

type Credit = {
  BMCRequired: number;
  BMCElective: number;
  AMCRequired: number;
  AMCElective: number;
};

const credits: Record<string, Credit> = {
  J: {
    BMCRequired: 12,
    BMCElective: 14,
    AMCRequired: 14,
    AMCElective: 28,
  },
};

function CourseInput({
  label,
  value,
  setValue,
  controlId,
  max,
}: {
  label: string;
  value: number | null;
  setValue: (value: number | null) => void;
  controlId: string;
  max?: string | number;
}) {
  return (
    <FormGroup as={Row} controlId={controlId}>
      <FormLabel column sm={9}>
        {label}
      </FormLabel>
      <Col sm={3}>
        <FormControl
          type="number"
          min={0}
          max={max}
          value={value ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              setValue(parseInt(value));
            } else {
              setValue(null);
            }
          }}
        />
      </Col>
    </FormGroup>
  );
}

export default function Calculator() {
  const [department, setDepartment] = useState<string | null>(null);
  const [grade, setGrade] = useState<number | null>(null);
  const [secondLanguage, setSecondLanguage] = useState<string | null>(null);

  // General Education Course: 総合教育科目
  const [GECHiyoshi12X, setGECHiyoshi12X] = useState<number | null>(null);
  const [GECHiyoshi12Y, setGECHiyoshi12Y] = useState<number | null>(null);
  const [GECHiyoshi12PE, setGECHiyoshi12PE] = useState<number | null>(null);
  const [GECHiyoshi34X, setGECHiyoshi34X] = useState<number | null>(null);
  const [GECHiyoshi34Y, setGECHiyoshi34Y] = useState<number | null>(null);
  const [GECHiyoshi34PE, setGECHiyoshi34PE] = useState<number | null>(null);
  const [GECYagami, setGECYagami] = useState<number | null>(null);

  // Language: 言語
  const [langEnglish, setLangEnglish] = useState<number | null>(null);
  const [langGermany, setLangGermany] = useState<number | null>(null);
  const [langFrench, setLangFrench] = useState<number | null>(null);
  const [langChinese, setLangChinese] = useState<number | null>(null);
  const [langRussian, setLangRussian] = useState<number | null>(null);
  const [langKorean, setLangKorean] = useState<number | null>(null);
  const [langJapanese, setLangJapanese] = useState<number | null>(null);

  // Foundational Courses: 基礎教育科目
  const [FCRequired, setFCRequired] = useState<number | null>(null);
  const [FCMath, setFCMath] = useState<number | null>(null);
  const [FCPhysics, setFCPhysics] = useState<number | null>(null);
  const [FCChemistry, setFCChemistry] = useState<number | null>(null);

  // Basic Major Courses: 専門基礎科目
  const [BMCRequired, setBMCRequired] = useState<number | null>(null);
  const [BMCElective, setBMCElective] = useState<number | null>(null);

  // Advanced Major Courses: 学科専門科目
  const [AMCRequired3, setAMCRequired3] = useState<number | null>(null);
  const [AMCRequired4, setAMCRequired4] = useState<number | null>(null);
  const [AMCElective, setAMCElective] = useState<number | null>(null);
  const [AMCRelated, setAMCRelated] = useState<number | null>(null);
  const [AMCGraduation, setAMCGraduation] = useState<number | null>(null);

  // Voluntary Elective Courses: 自主選択科目
  const [VEC, setVEC] = useState<number | null>(null);

  // Free Elective Courses: 自由科目
  const [FEC, setFEC] = useState<number | null>(null);

  const GECTotal = useMemo(() => {
    const PE =
      (GECHiyoshi12PE ?? 0) + (GECHiyoshi34PE ?? 0) <= 2
        ? (GECHiyoshi12PE ?? 0) + (GECHiyoshi34PE ?? 0)
        : 2;
    return (
      (GECHiyoshi12X ?? 0) +
      (GECHiyoshi12Y ?? 0) +
      (GECHiyoshi34X ?? 0) +
      (GECHiyoshi34Y ?? 0) +
      (GECYagami ?? 0) +
      PE
    );
  }, [
    GECHiyoshi12X,
    GECHiyoshi12Y,
    GECHiyoshi12PE,
    GECHiyoshi34X,
    GECHiyoshi34Y,
    GECHiyoshi34PE,
    GECYagami,
  ]);

  const langTotal = useMemo(() => {
    switch (secondLanguage) {
      case 'germany':
        return (langEnglish ?? 0) + (langGermany ?? 0);
      case 'french':
        return (langEnglish ?? 0) + (langFrench ?? 0);
      case 'chinese':
        return (langEnglish ?? 0) + (langChinese ?? 0);
      case 'russian':
        return (langEnglish ?? 0) + (langRussian ?? 0);
      case 'korean':
        return (langEnglish ?? 0) + (langKorean ?? 0);
      case 'japanese':
        return (langEnglish ?? 0) + (langJapanese ?? 0);
      default:
        return langEnglish ?? 0;
    }
  }, [
    secondLanguage,
    langEnglish,
    langGermany,
    langFrench,
    langChinese,
    langRussian,
    langKorean,
    langJapanese,
  ]);

  const AMCElectiveTotal = useMemo(() => {
    const related = (AMCRelated ?? 0) <= 4 ? AMCRelated ?? 0 : 4;
    const graduation = (AMCGraduation ?? 0) <= 10 ? AMCGraduation ?? 0 : 10;
    return (AMCElective ?? 0) + related + graduation;
  }, [AMCElective, AMCRelated, AMCGraduation]);

  const VECTotal = useMemo(() => {
    const GEC = GECTotal - 18 > 0 ? GECTotal - 18 : 0;
    if (department) {
      const BMC = (BMCElective ?? 0) - credits[department].BMCElective;
      const AMC = AMCElective ?? 0 - credits[department].AMCElective;
      const over = (BMC > 0 ? BMC : 0) + (AMC > 0 ? AMC : 0);
      return (VEC ?? 0) + GEC + over;
    } else {
      return (VEC ?? 0) + GEC;
    }
  }, [department, GECTotal, BMCElective, AMCElective, VEC]);

  return (
    <>
      <Stack gap={2}>
        <FormSelect onChange={(e) => setDepartment(e.target.value)}>
          <option>学科を選択</option>
          <option value="J">情報工学科</option>
        </FormSelect>
        <FormSelect
          onChange={(e) =>
            setGrade(
              e.target.value === '学年を選択' ? null : parseInt(e.target.value),
            )
          }
        >
          <option selected>学年を選択</option>
          <option value={4}>4年</option>
          <option value={3}>3年</option>
          <option value={2}>2年</option>
          <option value={1}>1年</option>
        </FormSelect>
        <FormSelect
          onChange={(e) =>
            setSecondLanguage(
              e.target.value === '第二外国語を選択' ? null : e.target.value,
            )
          }
        >
          <option selected>第二外国語を選択</option>
          <option value="germany">ドイツ語</option>
          <option value="french">フランス語</option>
          <option value="chinese">中国語</option>
          <option value="russian">ロシア語</option>
          <option value="korean">朝鮮語</option>
          <option value="japanese">日本語</option>
        </FormSelect>

        <CourseInput
          label="分野：01-01-11 総合教育科目 第１・２学年設置科目 系列Ｘ（人文・社会・学際系列）"
          value={GECHiyoshi12X}
          setValue={setGECHiyoshi12X}
          controlId="GECHiyoshi12X"
        />
        <CourseInput
          label="分野：01-01-12 総合教育科目 第１・２学年設置科目 系列Ｙ（自然科学系列・総合教育セミナー・外国語）"
          value={GECHiyoshi12Y}
          setValue={setGECHiyoshi12Y}
          controlId="GECHiyoshi12Y"
        />
        <CourseInput
          label="分野：01-01-13 総合教育科目 第１・２学年設置科目 体育実技科目　（日吉１０単位算入分）"
          value={GECHiyoshi12PE}
          setValue={setGECHiyoshi12PE}
          controlId="GECHiyoshi12PE"
        />
        {grade && grade >= 3 && (
          <>
            <CourseInput
              label="分野：01-01-14 総合教育科目 系列Ｘ（人文・社会・学際系列）"
              value={GECHiyoshi34X}
              setValue={setGECHiyoshi34X}
              controlId="GECHiyoshi34X"
            />
            <CourseInput
              label="分野：01-01-15 総合教育科目 系列Ｙ（自然科学系列・総合教育セミナー・外国語）"
              value={GECHiyoshi34Y}
              setValue={setGECHiyoshi34Y}
              controlId="GECHiyoshi34Y"
            />
            <CourseInput
              label="分野：01-01-16 総合教育科目 体育実技科目"
              value={GECHiyoshi34PE}
              setValue={setGECHiyoshi34PE}
              controlId="GECHiyoshi34PE"
            />
            <CourseInput
              label="分野：01-02-11 総合教育科目 矢上設置科目"
              value={GECYagami}
              setValue={setGECYagami}
              controlId="GECYagami"
            />
          </>
        )}
        <CourseInput
          label="分野：02-01-01 外国語科目 英語"
          value={langEnglish}
          setValue={setLangEnglish}
          controlId="langEnglish"
          max={8}
        />
        {secondLanguage === 'germany' && (
          <CourseInput
            label="分野：02-01-02 外国語科目 ドイツ語"
            value={langGermany}
            setValue={setLangGermany}
            controlId="langGermany"
            max={8}
          />
        )}
        {secondLanguage === 'french' && (
          <CourseInput
            label="分野：02-01-03 外国語科目 フランス語"
            value={langFrench}
            setValue={setLangFrench}
            controlId="langFrench"
            max={8}
          />
        )}
        {secondLanguage === 'chinese' && (
          <CourseInput
            label="分野：02-01-04 外国語科目 中国語"
            value={langChinese}
            setValue={setLangChinese}
            controlId="langChinese"
            max={8}
          />
        )}
        {secondLanguage === 'russian' && (
          <CourseInput
            label="分野：02-01-05 外国語科目 ロシア語"
            value={langRussian}
            setValue={setLangRussian}
            controlId="langRussian"
            max={8}
          />
        )}
        {secondLanguage === 'korean' && (
          <CourseInput
            label="分野：02-01-06 外国語科目 朝鮮語"
            value={langKorean}
            setValue={setLangKorean}
            controlId="langKorean"
            max={8}
          />
        )}
        {secondLanguage === 'japanese' && (
          <CourseInput
            label="分野：02-01-07 外国語科目 日本語"
            value={langJapanese}
            setValue={setLangJapanese}
            controlId="langJapanese"
            max={8}
          />
        )}
        <CourseInput
          label="分野：03-01-01 基礎教育科目 必修"
          value={FCRequired}
          setValue={setFCRequired}
          controlId="FCRequired"
          max={8}
        />
        <CourseInput
          label="分野：03-01-02 基礎教育科目 数学"
          value={FCMath}
          setValue={setFCMath}
          controlId="FCMath"
          max={8}
        />
        <CourseInput
          label="分野：03-01-03 基礎教育科目 物理学"
          value={FCPhysics}
          setValue={setFCPhysics}
          controlId="FCPhysics"
          max={8}
        />
        <CourseInput
          label="分野：03-01-04 基礎教育科目 化学"
          value={FCChemistry}
          setValue={setFCChemistry}
          controlId="FCChemistry"
          max={4}
        />
        {grade && grade >= 2 && (
          <>
            <CourseInput
              label="分野：04-01-01 専門教育科目 専門基礎科目 必修"
              value={BMCRequired}
              setValue={setBMCRequired}
              controlId="BMCRequired"
            />
            <CourseInput
              label="分野：04-01-02 専門教育科目 専門基礎科目 選択"
              value={BMCElective}
              setValue={setBMCElective}
              controlId="BMCElective"
            />
          </>
        )}
        {grade && grade >= 3 && (
          <CourseInput
            label="分野：04-02-01 専門教育科目 学科専門科目 必修（３年）"
            value={AMCRequired3}
            setValue={setAMCRequired3}
            controlId="AMCRequired3"
          />
        )}
        {grade && grade >= 4 && (
          <CourseInput
            label="分野：04-02-02 専門教育科目 学科専門科目 必修（４年）"
            value={AMCRequired4}
            setValue={setAMCRequired4}
            controlId="AMCRequired4"
          />
        )}
        {grade && grade >= 3 && (
          <>
            <CourseInput
              label="分野：04-02-11 専門教育科目 学科専門科目 選択"
              value={AMCElective}
              setValue={setAMCElective}
              controlId="AMCElective"
            />
            <CourseInput
              label="分野：04-02-31 専門教育科目 学科専門科目 関連科目"
              value={AMCRelated}
              setValue={setAMCRelated}
              controlId="AMCRelated"
            />
            <CourseInput
              label="分野：04-02-32 専門教育科目 学科専門科目 理工学研究科設置科目"
              value={AMCGraduation}
              setValue={setAMCGraduation}
              controlId="AMCGraduation"
            />
          </>
        )}
        <CourseInput
          label="分野：04-02-33 専門教育科目 学科専門科目 自主選択科目"
          value={VEC}
          setValue={setVEC}
          controlId="VEC"
        />
        <CourseInput
          label="分野：05-01-01 自由科目 （卒業単位対象外）"
          value={FEC}
          setValue={setFEC}
          controlId="FEC"
        />
      </Stack>
      <Table>
        <thead>
          <tr>
            <th rowSpan={3}></th>
            <th rowSpan={3}>総合教育科目</th>
            <th rowSpan={3}>外国語科目</th>
            <th rowSpan={3}>基礎教育科目</th>
            <th colSpan={4}>専門教育科目</th>
            <th rowSpan={3}>自主選択科目（超過分含む）</th>
          </tr>
          <tr>
            <th colSpan={2}>専門基礎科目</th>
            <th colSpan={2}>学科専門科目</th>
          </tr>
          <tr>
            <th>必修</th>
            <th>選択</th>
            <th>必修</th>
            <th>選択</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>取得単位数</th>
            <td>{GECTotal}</td>
            <td>{langTotal}</td>
            <td>
              {(FCRequired ?? 0) +
                (FCMath ?? 0) +
                (FCPhysics ?? 0) +
                (FCChemistry ?? 0)}
            </td>
            <td>{BMCRequired ?? 0}</td>
            <td>{BMCElective ?? 0}</td>
            <td>{(AMCRequired3 ?? 0) + (AMCRequired4 ?? 0)}</td>
            <td>{AMCElectiveTotal}</td>
            <td>{VECTotal}</td>
          </tr>
          <tr>
            <th>卒業条件</th>
            <td>18</td>
            <td>16</td>
            <td>28</td>
            <td>{department && credits[department].BMCRequired}</td>
            <td>{department && credits[department].BMCElective}</td>
            <td>{department && credits[department].AMCRequired}</td>
            <td>{department && credits[department].AMCElective}</td>
            <td>8</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
