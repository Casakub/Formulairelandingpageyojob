import svgPaths from "./svg-0ryybw6wlo";
import imgRectangle1 from "figma:asset/ebf8bc5c8d897e610c9819ee634ab69c86ed8174.png";
import imgRectangle3 from "figma:asset/37c5275834309d3d9730ef10771e70aa4a174eba.png";
import { imgRectangle, imgRectangle2 } from "./svg-0xncq";

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px] mask-size-[127.18px_126.923px] opacity-[0.64]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle1} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%] mix-blend-screen" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%] mix-blend-screen" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[1.53%_1.78%_1.62%_1.52%] opacity-80" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 127">
        <g id="Group" opacity="0.05">
          <path d={svgPaths.p319bb400} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%]" data-name="Group">
      <Group1 />
      <Group2 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[1.47%_1.46%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.081px_0.08px] mask-size-[127.18px_126.923px] opacity-[0.019]" data-name="Group" style={{ maskImage: `url('${imgRectangle}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 128">
        <g id="Group">
          <path d={svgPaths.p219a7a00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%] mix-blend-screen" data-name="Clip path group">
      <Group4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%] mix-blend-screen" data-name="Group">
      <ClipPathGroup1 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[1.53%_1.78%_1.62%_1.52%] mix-blend-screen opacity-[0.024]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 127">
        <g id="Group" opacity="0.05">
          <path d={svgPaths.p319bb400} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%] mix-blend-screen" data-name="Group">
      <Group5 />
      <Group6 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%]" data-name="Group">
      <Group7 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%]" data-name="Group">
      <Group3 />
      <Group8 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[80.15%_80.61%_1.54%_1.14%]" data-name="Group">
      <div className="absolute inset-[80.15%_80.61%_1.54%_1.14%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px] mask-size-[19.928px_19.922px] opacity-[0.76]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle2}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle3} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-[81.67%_82.18%_3.12%_2.67%] mix-blend-screen" data-name="Clip path group">
      <Group10 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[81.67%_82.18%_3.12%_2.67%] mix-blend-screen" data-name="Group">
      <ClipPathGroup2 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[81.67%_82.18%_3.12%_2.67%]" data-name="Group">
      <Group11 />
      <div className="absolute inset-[81.67%_82.18%_3.12%_2.67%] opacity-80" data-name="Vector">
        <div className="absolute inset-[-1.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
            <path d={svgPaths.p94c0c00} id="Vector" opacity="0.08" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%]" data-name="Group">
      <Group9 />
      <Group12 />
    </div>
  );
}

function Calque() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%]" data-name="Calque 1">
      <Group13 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[1.53%_1.78%_1.62%_1.52%]" data-name="Group">
      <Calque />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full" data-name="Frame">
      <Group14 />
    </div>
  );
}