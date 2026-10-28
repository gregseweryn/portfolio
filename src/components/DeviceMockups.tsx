import React from 'react'
import './devices.css'

type StageTone = 'neutral' | 'violet' | 'dark'

interface StageProps {
  tone?: StageTone
  className?: string
  children: React.ReactNode
}

/** Soft studio backdrop with perspective for 3D devices. */
export const DeviceStage: React.FC<StageProps> = ({ tone = 'neutral', className = '', children }) => (
  <div className={`dev-stage dev-${tone} ${className}`}>{children}</div>
)

interface LaptopProps {
  src?: string
  alt?: string
  children?: React.ReactNode
  tone?: StageTone
  soft?: boolean
  eager?: boolean
  className?: string
}

/** Laptop with a screen. `soft` = gentler tilt for dense grids. */
export const Laptop3D: React.FC<LaptopProps> = ({ src, alt = '', children, tone = 'neutral', soft = false, eager = false, className = '' }) => (
  <DeviceStage tone={tone} className={`aspect-[16/10] ${className}`}>
    <div className={`dev-laptop ${soft ? 'is-soft' : ''}`}>
      <div className="dev-lid">
        <span className="dev-camera" aria-hidden="true" />
        <div className="dev-screen">
          {src ? <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} /> : <div className="dev-screen-fill">{children}</div>}
        </div>
      </div>
      <div className="dev-base" aria-hidden="true"><span /></div>
    </div>
  </DeviceStage>
)

interface PhonePairProps {
  light: string
  dark: string
  tone?: StageTone
  className?: string
}

/** Two phones angled toward each other, cropped at the bottom. */
export const PhonePair3D: React.FC<PhonePairProps> = ({ light, dark, tone = 'violet', className = '' }) => (
  <DeviceStage tone={tone} className={`aspect-[16/10] ${className}`}>
    <div className="dev-phones">
      <img className="dev-phone dev-phone-a" src={light} alt="" width={393} height={852} loading="lazy" decoding="async" draggable={false} />
      <img className="dev-phone dev-phone-b" src={dark} alt="" width={393} height={852} loading="lazy" decoding="async" draggable={false} />
    </div>
  </DeviceStage>
)

interface PhoneProps {
  src: string
  alt?: string
  tone?: StageTone
  eager?: boolean
  className?: string
}

/** Single phone mockup tilted gently on a stage. */
export const Phone3D: React.FC<PhoneProps> = ({ src, alt = '', tone = 'violet', eager = false, className = '' }) => (
  <DeviceStage tone={tone} className={`aspect-[16/10] ${className}`}>
    <div className="dev-phone-single">
      <div className="dev-phone-frame">
        <span className="dev-phone-island" aria-hidden="true" />
        <div className="dev-phone-screen">
          <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />
        </div>
      </div>
    </div>
  </DeviceStage>
)

interface PhoneTrioProps {
  left: string
  center: string
  right: string
  tone?: StageTone
  className?: string
}

/** Trio of phones (left, center, right) on a studio stage. */
export const PhoneTrio3D: React.FC<PhoneTrioProps> = ({ left, center, right, tone = 'violet', className = '' }) => (
  <DeviceStage tone={tone} className={`aspect-[16/10] ${className}`}>
    <div className="dev-phone-trio">
      <img className="dev-trio-left" src={left} alt="" width={393} height={852} loading="lazy" decoding="async" draggable={false} />
      <img className="dev-trio-center" src={center} alt="" width={393} height={852} loading="lazy" decoding="async" draggable={false} />
      <img className="dev-trio-right" src={right} alt="" width={393} height={852} loading="lazy" decoding="async" draggable={false} />
    </div>
  </DeviceStage>
)
