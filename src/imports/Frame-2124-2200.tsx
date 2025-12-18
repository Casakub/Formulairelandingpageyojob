import svgPaths from "./svg-jeag5p6r3l";
import imgRectangle from "figma:asset/7bc64bc144937599502bd68c77ec76315b36d1f0.png";
import imgRectangle2 from "figma:asset/adf361f82f12a400b268e62835fee4f4a9769596.png";
import imgRectangle4 from "figma:asset/574527319065f95f49256ff809cb233053b2e54a.png";
import { imgRectangle1, imgRectangle3 } from "./svg-wx2tn";

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-0" data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle} />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[26.78%_26.77%_26.8%_26.99%]" data-name="Group">
      <div className="absolute inset-[26.78%_26.77%_26.8%_26.99%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px] mask-size-[55px_54.921px] opacity-[0.64]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle1}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle2} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[28.35%_28.37%_28.47%_28.56%] mix-blend-screen" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[28.35%_28.37%_28.47%_28.56%] mix-blend-screen" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[28.35%_28.37%_28.47%_28.56%] opacity-80" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55 55">
        <g id="Group" opacity="0.05">
          <path d={svgPaths.p2a733130} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[28.35%_28.37%_28.47%_28.56%]" data-name="Group">
      <Group2 />
      <Group3 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[28.29%_28.27%_28.31%_28.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.08px] mask-size-[55px_54.921px] opacity-[0.019]" data-name="Group" style={{ maskImage: `url('${imgRectangle1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Group">
          <path d={svgPaths.p2473f280} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[28.35%_28.37%_28.47%_28.56%] mix-blend-screen" data-name="Clip path group">
      <Group5 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[28.35%_28.37%_28.47%_28.56%] mix-blend-screen" data-name="Group">
      <ClipPathGroup1 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[28.35%_28.37%_28.47%_28.56%] mix-blend-screen opacity-[0.024]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55 55">
        <g id="Group" opacity="0.05">
          <path d={svgPaths.p2a733130} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[28.35%_28.37%_28.47%_28.56%] mix-blend-screen" data-name="Group">
      <Group6 />
      <Group7 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[28.35%_28.37%_28.47%_28.56%]" data-name="Group">
      <Group8 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[28.35%_28.37%_28.47%_28.56%]" data-name="Group">
      <Group4 />
      <Group9 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group />
      <Group10 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[63.27%_62.76%_26.54%_27.09%]" data-name="Group">
      <div className="absolute inset-[63.27%_62.76%_26.54%_27.09%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px] mask-size-[8.604px_8.589px] opacity-[0.76]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle3}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle4} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-[64.84%_64.6%_28.41%_28.66%] mix-blend-screen" data-name="Clip path group">
      <Group12 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[64.84%_64.6%_28.41%_28.66%] mix-blend-screen" data-name="Group">
      <ClipPathGroup2 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[64.84%_64.6%_28.41%_28.66%]" data-name="Group">
      <Group13 />
      <div className="absolute inset-[64.84%_64.6%_28.41%_28.66%] opacity-80" data-name="Vector">
        <div className="absolute inset-[-2.91%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.pa43ff00} id="Vector" opacity="0.08" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group11 />
      <Group14 />
    </div>
  );
}

function Calque() {
  return (
    <div className="absolute contents inset-0" data-name="Calque 1">
      <Group15 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Calque />
    </div>
  );
}

export default function Frame({ className = '' }: { className?: string }) {
  return (
    <div className={`relative size-full ${className}`} data-name="Frame">
      <Group16 />
    </div>
  );
}