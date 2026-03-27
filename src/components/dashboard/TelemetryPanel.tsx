import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSystem } from '@/contexts/SystemContext';
import { Activity, Shield, Radio } from 'lucide-react';

const TelemetryPanel: React.FC = () => {
  const { t, lang } = useLanguage();
  const { assets } = useSystem();

  return (
    <div className="space-y-4 p-4">
      <h3 className="panel-header flex items-center gap-2">
        <Activity className="h-4 w-4" />{t('nav.telemetry')} — {lang === 'mr' ? 'सरासरी ५-मिनिट टेलीमेट्री' : 'AVG 5-Min Telemetry'}
      </h3>

      {/* VeerProbe Panel */}
      <div className="gov-card p-4">
        <h4 className="flex items-center gap-2 text-sm font-bold mb-3">
          <Radio className="h-4 w-4 text-primary" />
          <span>{lang === 'mr' ? 'वीरप्रोब — प्री-एंट्री सेन्सर' : 'VeerProbe — Pre-Entry Sensor'}</span>
          <span className="text-[10px] font-normal text-muted-foreground ml-auto">{lang === 'mr' ? 'स्रोत: VeerProbe' : 'Source: VeerProbe'}</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full gov-table">
            <thead>
              <tr>
                <th>{t('asset.id')}</th>
                <th>{t('zone.type')}</th>
                <th>H₂S (ppm)</th>
                <th>CH₄ (%)</th>
                <th>CO (ppm)</th>
                <th>{lang === 'mr' ? 'तापमान' : 'Temp'} (°C)</th>
                <th>{lang === 'mr' ? 'आर्द्रता' : 'Humidity'} (%)</th>
                <th>{lang === 'mr' ? 'पाणी खोली' : 'Water Depth'} (m)</th>
                <th>{t('risk.level')}</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(a => (
                <tr key={a.id} className="hover:bg-muted/50 transition-colors">
                  <td className="font-mono font-medium text-xs">{a.id}</td>
                  <td>
                    <span className={a.zone === 'red' ? 'risk-badge-red' : a.zone === 'yellow' ? 'risk-badge-yellow' : 'risk-badge-green'}>
                      {lang === 'mr' ? a.zoneTypeMr : a.zoneType}
                    </span>
                  </td>
                  <td className={`sensor-value text-sm ${a.sensors.h2s > 15 ? 'text-[hsl(var(--risk-red))]' : a.sensors.h2s > 5 ? 'text-[hsl(var(--risk-yellow))]' : 'text-[hsl(var(--risk-green))]'}`}>{a.sensors.h2s}</td>
                  <td className={`sensor-value text-sm ${a.sensors.ch4 > 3 ? 'text-[hsl(var(--risk-red))]' : a.sensors.ch4 > 1 ? 'text-[hsl(var(--risk-yellow))]' : 'text-[hsl(var(--risk-green))]'}`}>{a.sensors.ch4}</td>
                  <td className={`sensor-value text-sm ${a.sensors.co > 25 ? 'text-[hsl(var(--risk-red))]' : a.sensors.co > 10 ? 'text-[hsl(var(--risk-yellow))]' : 'text-[hsl(var(--risk-green))]'}`}>{a.sensors.co}</td>
                  <td className="sensor-value text-sm">{a.sensors.temp}</td>
                  <td className="sensor-value text-sm">{a.sensors.humidity}</td>
                  <td className={`sensor-value text-sm ${a.sensors.waterDepth > 2 ? 'text-[hsl(var(--risk-red))]' : a.sensors.waterDepth > 1 ? 'text-[hsl(var(--risk-yellow))]' : 'text-[hsl(var(--risk-green))]'}`}>{a.sensors.waterDepth}</td>
                  <td>
                    <span className={a.riskLevel === 'high' ? 'risk-badge-red' : a.riskLevel === 'medium' ? 'risk-badge-yellow' : 'risk-badge-green'}>
                      {t(`risk.${a.riskLevel}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VeerGuard Panel */}
      <div className="gov-card p-4">
        <h4 className="flex items-center gap-2 text-sm font-bold mb-3">
          <Shield className="h-4 w-4 text-primary" />
          <span>{lang === 'mr' ? 'वीरगार्ड — वेअरेबल सेन्सर' : 'VeerGuard — Wearable Sensor'}</span>
          <span className="text-[10px] font-normal text-muted-foreground ml-auto">{lang === 'mr' ? 'स्रोत: VeerGuard' : 'Source: VeerGuard'}</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full gov-table">
            <thead>
              <tr>
                <th>{t('asset.id')}</th>
                <th>{t('zone.type')}</th>
                <th>H₂S (ppm)</th>
                <th>CH₄ (%)</th>
                <th>CO (ppm)</th>
                <th>O₂ (%)</th>
                <th>{lang === 'mr' ? 'तापमान' : 'Temp'} (°C)</th>
                <th>{lang === 'mr' ? 'आर्द्रता' : 'Humidity'} (%)</th>
                <th>MPU6050</th>
                <th>{lang === 'mr' ? 'बॅटरी' : 'Battery'} (%)</th>
                <th>{t('risk.level')}</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(a => (
                <tr key={a.id} className="hover:bg-muted/50 transition-colors">
                  <td className="font-mono font-medium text-xs">{a.id}</td>
                  <td>
                    <span className={a.zone === 'red' ? 'risk-badge-red' : a.zone === 'yellow' ? 'risk-badge-yellow' : 'risk-badge-green'}>
                      {lang === 'mr' ? a.zoneTypeMr : a.zoneType}
                    </span>
                  </td>
                  <td className={`sensor-value text-sm ${a.sensors.h2s > 15 ? 'text-[hsl(var(--risk-red))]' : a.sensors.h2s > 5 ? 'text-[hsl(var(--risk-yellow))]' : 'text-[hsl(var(--risk-green))]'}`}>{a.sensors.h2s}</td>
                  <td className={`sensor-value text-sm ${a.sensors.ch4 > 3 ? 'text-[hsl(var(--risk-red))]' : a.sensors.ch4 > 1 ? 'text-[hsl(var(--risk-yellow))]' : 'text-[hsl(var(--risk-green))]'}`}>{a.sensors.ch4}</td>
                  <td className={`sensor-value text-sm ${a.sensors.co > 25 ? 'text-[hsl(var(--risk-red))]' : a.sensors.co > 10 ? 'text-[hsl(var(--risk-yellow))]' : 'text-[hsl(var(--risk-green))]'}`}>{a.sensors.co}</td>
                  <td className={`sensor-value text-sm ${a.sensors.o2 < 18 ? 'text-[hsl(var(--risk-red))]' : a.sensors.o2 < 19.5 ? 'text-[hsl(var(--risk-yellow))]' : 'text-[hsl(var(--risk-green))]'}`}>{a.sensors.o2}</td>
                  <td className="sensor-value text-sm">{a.sensors.temp}</td>
                  <td className="sensor-value text-sm">{a.sensors.humidity}</td>
                  <td>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${a.sensors.mpu6050Fallback ? 'bg-[hsl(var(--risk-red-bg))] text-[hsl(var(--risk-red))]' : 'bg-muted text-muted-foreground'}`}>
                      {a.sensors.mpu6050Fallback ? (lang === 'mr' ? 'फॉलबॅक!' : 'FALLBACK!') : (lang === 'mr' ? 'सामान्य' : 'Normal')}
                    </span>
                  </td>
                  <td className={`sensor-value text-sm ${a.sensors.battery < 30 ? 'text-[hsl(var(--risk-red))]' : ''}`}>{Math.round(a.sensors.battery)}</td>
                  <td>
                    <span className={a.riskLevel === 'high' ? 'risk-badge-red' : a.riskLevel === 'medium' ? 'risk-badge-yellow' : 'risk-badge-green'}>
                      {t(`risk.${a.riskLevel}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TelemetryPanel;
