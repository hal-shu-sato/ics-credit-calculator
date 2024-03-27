'use client';

import { useMemo } from 'react';

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
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

const langLabels: Record<string, string> = {
  germany: '分野：02-01-02 外国語科目 ドイツ語',
  french: '分野：02-01-03 外国語科目 フランス語',
  chinese: '分野：02-01-04 外国語科目 中国語',
  russian: '分野：02-01-05 外国語科目 ロシア語',
  korean: '分野：02-01-06 外国語科目 朝鮮語',
  japanese: '分野：02-01-07 外国語科目 日本語',
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
  setValue: (value: string) => void;
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
          onChange={(e) => setValue(e.target.value)}
        />
      </Col>
    </FormGroup>
  );
}

interface State {
  department: string | null;
  setDepartment: (department: string) => void;
  grade: number | null;
  setGrade: (grade: string) => void;
  secondLanguage: string | null;
  setSecondLanguage: (secondLanguage: string) => void;

  // General Education Course: 総合教育科目
  GECHiyoshi12X: number | null;
  setGECHiyoshi12X: (GECHiyoshi12X: string) => void;
  GECHiyoshi12Y: number | null;
  setGECHiyoshi12Y: (GECHiyoshi12Y: string) => void;
  GECHiyoshi12PE: number | null;
  setGECHiyoshi12PE: (GECHiyoshi12PE: string) => void;
  GECHiyoshi34X: number | null;
  setGECHiyoshi34X: (GECHiyoshi34X: string) => void;
  GECHiyoshi34Y: number | null;
  setGECHiyoshi34Y: (GECHiyoshi34Y: string) => void;
  GECHiyoshi34PE: number | null;
  setGECHiyoshi34PE: (GECHiyoshi34PE: string) => void;
  GECYagami: number | null;
  setGECYagami: (GECYagami: string) => void;

  // Language: 言語
  langEnglish: number | null;
  setLangEnglish: (langEnglish: string) => void;
  langSecond: number | null;
  setLangSecond: (langSecond: string) => void;

  // Foundational Courses: 基礎教育科目
  FCRequired: number | null;
  setFCRequired: (FCRequired: string) => void;
  FCMath: number | null;
  setFCMath: (FCMath: string) => void;
  FCPhysics: number | null;
  setFCPhysics: (FCPhysics: string) => void;
  FCChemistry: number | null;
  setFCChemistry: (FCChemistry: string) => void;

  // Basic Major Courses: 専門基礎科目
  BMCRequired: number | null;
  setBMCRequired: (BMCRequired: string) => void;
  BMCElective: number | null;
  setBMCElective: (BMCElective: string) => void;

  // Advanced Major Courses: 学科専門科目
  AMCRequired3: number | null;
  setAMCRequired3: (AMCRequired3: string) => void;
  AMCRequired4: number | null;
  setAMCRequired4: (AMCRequired4: string) => void;
  AMCElective: number | null;
  setAMCElective: (AMCElective: string) => void;
  AMCRelated: number | null;
  setAMCRelated: (AMCRelated: string) => void;
  AMCGraduation: number | null;
  setAMCGraduation: (AMCGraduation: string) => void;

  // Voluntary Elective Courses: 自主選択科目
  VEC: number | null;
  setVEC: (VEC: string) => void;

  // Free Elective Courses: 自由科目
  FEC: number | null;
  setFEC: (FEC: string) => void;
}

const useStore = create<State>()(
  persist(
    (set) => ({
      department: null,
      setDepartment: (department: string) => set({ department }),
      grade: null,
      setGrade: (grade: string) => {
        if (grade) {
          set({ grade: parseInt(grade) });
        } else {
          set({ grade: null });
        }
      },
      secondLanguage: null,

      // General Education Course: 総合教育科目
      setSecondLanguage: (secondLanguage: string) => set({ secondLanguage }),
      GECHiyoshi12X: null,
      setGECHiyoshi12X: (GECHiyoshi12X) =>
        set({ GECHiyoshi12X: parseInt(GECHiyoshi12X) }),
      GECHiyoshi12Y: null,
      setGECHiyoshi12Y: (GECHiyoshi12Y) =>
        set({ GECHiyoshi12Y: parseInt(GECHiyoshi12Y) }),
      GECHiyoshi12PE: null,
      setGECHiyoshi12PE: (GECHiyoshi12PE) =>
        set({ GECHiyoshi12PE: parseInt(GECHiyoshi12PE) }),
      GECHiyoshi34X: null,
      setGECHiyoshi34X: (GECHiyoshi34X) =>
        set({ GECHiyoshi34X: parseInt(GECHiyoshi34X) }),
      GECHiyoshi34Y: null,
      setGECHiyoshi34Y: (GECHiyoshi34Y) =>
        set({ GECHiyoshi34Y: parseInt(GECHiyoshi34Y) }),
      GECHiyoshi34PE: null,
      setGECHiyoshi34PE: (GECHiyoshi34PE) =>
        set({ GECHiyoshi34PE: parseInt(GECHiyoshi34PE) }),
      GECYagami: null,
      setGECYagami: (GECYagami) => set({ GECYagami: parseInt(GECYagami) }),

      // Language: 言語
      langEnglish: null,
      setLangEnglish: (langEnglish) =>
        set({ langEnglish: parseInt(langEnglish) }),
      langSecond: null,
      setLangSecond: (langSecond) => set({ langSecond: parseInt(langSecond) }),

      // Foundational Courses: 基礎教育科目
      FCRequired: null,
      setFCRequired: (FCRequired) => set({ FCRequired: parseInt(FCRequired) }),
      FCMath: null,
      setFCMath: (FCMath) => set({ FCMath: parseInt(FCMath) }),
      FCPhysics: null,
      setFCPhysics: (FCPhysics) => set({ FCPhysics: parseInt(FCPhysics) }),
      FCChemistry: null,
      setFCChemistry: (FCChemistry) =>
        set({ FCChemistry: parseInt(FCChemistry) }),

      // Basic Major Courses: 専門基礎科目
      BMCRequired: null,
      setBMCRequired: (BMCRequired) =>
        set({ BMCRequired: parseInt(BMCRequired) }),
      BMCElective: null,
      setBMCElective: (BMCElective) =>
        set({ BMCElective: parseInt(BMCElective) }),

      // Advanced Major Courses: 学科専門科目
      AMCRequired3: null,
      setAMCRequired3: (AMCRequired3) =>
        set({ AMCRequired3: parseInt(AMCRequired3) }),
      AMCRequired4: null,
      setAMCRequired4: (AMCRequired4) =>
        set({ AMCRequired4: parseInt(AMCRequired4) }),
      AMCElective: null,
      setAMCElective: (AMCElective) =>
        set({ AMCElective: parseInt(AMCElective) }),
      AMCRelated: null,
      setAMCRelated: (AMCRelated) => set({ AMCRelated: parseInt(AMCRelated) }),
      AMCGraduation: null,
      setAMCGraduation: (AMCGraduation) =>
        set({ AMCGraduation: parseInt(AMCGraduation) }),

      // Voluntary Elective Courses: 自主選択科目
      VEC: null,
      setVEC: (VEC) => set({ VEC: parseInt(VEC) }),

      // Free Elective Courses: 自由科目
      FEC: null,
      setFEC: (FEC) => set({ FEC: parseInt(FEC) }),
    }),
    {
      name: 'calculator-store',
    },
  ),
);

export default function Calculator() {
  const {
    department,
    setDepartment,
    grade,
    setGrade,
    secondLanguage,
    setSecondLanguage,
    GECHiyoshi12X,
    setGECHiyoshi12X,
    GECHiyoshi12Y,
    setGECHiyoshi12Y,
    GECHiyoshi12PE,
    setGECHiyoshi12PE,
    GECHiyoshi34X,
    setGECHiyoshi34X,
    GECHiyoshi34Y,
    setGECHiyoshi34Y,
    GECHiyoshi34PE,
    setGECHiyoshi34PE,
    GECYagami,
    setGECYagami,
    langEnglish,
    setLangEnglish,
    langSecond,
    setLangSecond,
    FCRequired,
    setFCRequired,
    FCMath,
    setFCMath,
    FCPhysics,
    setFCPhysics,
    FCChemistry,
    setFCChemistry,
    BMCRequired,
    setBMCRequired,
    BMCElective,
    setBMCElective,
    AMCRequired3,
    setAMCRequired3,
    AMCRequired4,
    setAMCRequired4,
    AMCElective,
    setAMCElective,
    AMCRelated,
    setAMCRelated,
    AMCGraduation,
    setAMCGraduation,
    VEC,
    setVEC,
    FEC,
    setFEC,
  } = useStore();

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
    if (secondLanguage) {
      return (langEnglish ?? 0) + (langSecond ?? 0);
    }
    return langEnglish ?? 0;
  }, [secondLanguage, langEnglish, langSecond]);

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
        <FormSelect
          value={department ?? ''}
          defaultValue=""
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">学科を選択</option>
          <option value="J">情報工学科</option>
        </FormSelect>
        <FormSelect
          value={grade ?? ''}
          defaultValue=""
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="">学年を選択</option>
          <option value={4}>4年</option>
          <option value={3}>3年</option>
          <option value={2}>2年</option>
          <option value={1}>1年</option>
        </FormSelect>
        <FormSelect
          value={secondLanguage ?? ''}
          defaultValue=""
          onChange={(e) => setSecondLanguage(e.target.value)}
        >
          <option value="">第二外国語を選択</option>
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
        {secondLanguage && (
          <CourseInput
            label={langLabels[secondLanguage]}
            value={langSecond}
            setValue={setLangSecond}
            controlId="langSecond"
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
            <th rowSpan={3}>合計</th>
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
            <td>
              {GECTotal +
                langTotal +
                (FCRequired ?? 0) +
                (FCMath ?? 0) +
                (FCPhysics ?? 0) +
                (FCChemistry ?? 0) +
                (BMCRequired ?? 0) +
                (BMCElective ?? 0) +
                (AMCRequired3 ?? 0) +
                (AMCRequired4 ?? 0) +
                AMCElectiveTotal +
                VECTotal}
            </td>
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
            <td>138</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
