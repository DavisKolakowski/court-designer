import { CourtType, CourtOverlays } from "../types/court";

interface CourtSVGProps {
  selectedCourt: CourtType;
  appliedColors: Record<string, string>;
  showAccessories: boolean;
  overlays: CourtOverlays;
}

const CourtSVG = ({ selectedCourt, appliedColors, showAccessories, overlays }: CourtSVGProps) => {
  const getElementColor = (elementType: string, defaultColor: string) => {
    const key = `${selectedCourt}-${elementType}`;
    return appliedColors[key] || defaultColor;
  };

  const renderBasketballCourt = () => (
    <g>
      {/* Basketball Playing Area */}
      <rect 
        x="37.3" y="44.33" width="1223.36" height="644.33" 
        fill={getElementColor('playing-area', '#233e6d')} // Standard Blue
      />
      
      {/* Basketball Three-Second Areas */}
      <rect 
        x="1015.63" y="290.7" width="245.02" height="155.7" 
        fill={getElementColor('three-second-area', '#1a3054')} // Competition Blue
      />
      <rect 
        x="38.18" y="290.1" width="245.02" height="155.7" 
        fill={getElementColor('three-second-area', '#1a3054')} // Competition Blue
      />
      
      {/* Basketball Center Circle */}
      <circle 
        cx="649.98" cy="367.58" r="77.14" 
        fill={getElementColor('center-circle', '#1a3054')} // Competition Blue
      />
      
      {/* Basketball Three Point Areas (this represents the actual three-point line areas) */}
      <path 
        d="m1260.67,115.67c-17.2-3.45-41.76-.81-60-.81-145.93,0-264.38,112.02-264.38,255.17s118.46,251.56,264.38,251.56c19.75,0,40.45-.22,60,.22"
        fill={getElementColor('three-point', '#1a3054')} // Competition Blue
      />
      <path 
        d="m37.29,620.03h0c17.21,3.45,41.78.81,60.04.81,146,0,264.52-112.02,264.52-255.17S243.34,114.11,97.33,114.11c-19.76,0-40.47.22-60.04-.22"
        fill={getElementColor('three-point', '#1a3054')} // Competition Blue
      />
      
      {/* Basketball Court Lines */}
      <g stroke={getElementColor('lines', '#ffffff')} strokeWidth="3" fill="none"> // Brilliant White instead of #fff
        {/* Free Throw Circles */}
        <path d="m270.84,444.16c-38.35-5.51-67.78-37.9-67.78-77.02s31.43-73.66,71.64-77.48" strokeDasharray="0 0 0 0 0 0 7.71 7.71"/>
        <path d="m1027.25,291.53c38.32,5.51,67.75,37.9,67.75,77.02s-31.41,73.66-71.6,77.48" strokeDasharray="0 0 0 0 0 0 7.71 7.71"/>
        <path d="m1015.63,446.41c-43.83,0-79.36-34.85-79.36-77.85s35.53-77.85,79.36-77.85"/>
        <path d="m282.46,289.29c43.85,0,79.4,34.85,79.4,77.85s-35.55,77.85-79.4,77.85"/>
        
        {/* Free Throw Lines */}
        <line x1="1015.63" y1="446.29" x2="1015.63" y2="290.59"/>
        <line x1="282.46" y1="289.41" x2="282.46" y2="445.1"/>
        
        {/* Lane Lines */}
        <line x1="1015.63" y1="290.59" x2="1260.66" y2="290.59"/>
        <line x1="1260.66" y1="446.29" x2="1015.63" y2="446.29"/>
        <line x1="282.46" y1="445.1" x2="37.3" y2="445.1"/>
        <line x1="37.3" y1="289.41" x2="282.46" y2="289.41"/>
        
        {/* Three Point Lines */}
        <path d="m1260.67,115.67c-17.2-3.45-41.76-.81-60-.81-145.93,0-264.38,112.02-264.38,255.17s118.46,251.56,264.38,251.56c19.75,0,40.45-.22,60,.22"/>
        <path d="m37.29,620.03h0c17.21,3.45,41.78.81,60.04.81,146,0,264.52-112.02,264.52-255.17S243.34,114.11,97.33,114.11c-19.76,0-40.47.22-60.04-.22"/>
        
        {/* Baselines and Sidelines */}
        <line x1="1260.67" y1="45.41" x2="1260.67" y2="689.74" strokeWidth="3.12"/>
        <line x1="37.3" y1="689.74" x2="37.3" y2="45.41" strokeWidth="3.12"/>
        <line x1="1260.67" y1="689.74" x2="37.3" y2="689.74" strokeWidth="3.12"/>
        <line x1="37.3" y1="45.41" x2="1260.67" y2="45.41" strokeWidth="3.12"/>
        
        {/* Mid Court Line */}
        <line x1="648.98" y1="689.74" x2="648.98" y2="45.41" strokeWidth="3.12"/>
        
        {/* Center Circle Outline */}
        <circle cx="649.68" cy="367.85" r="77.14" strokeWidth="3.12"/>
      </g>
      
      {/* Basketball Hoops */}
      {showAccessories && (
        <g>
          {/* Right Hoop */}
          <ellipse cx="1196.19" cy="368.56" rx="9.29" ry="9.11" fill="none" stroke="#f9a042" strokeWidth="2.69"/>
          <line x1="1214.63" y1="408.73" x2="1214.63" y2="329.85" stroke="#f9a042" strokeWidth="7.87"/>
          <rect x="1205.47" y="364.26" width="7.27" height="8.59" fill="none" stroke="#f9a042" strokeWidth="2.87"/>
          
          {/* Left Hoop */}
          <ellipse cx="101.82" cy="367.13" rx="9.29" ry="9.11" fill="none" stroke="#f9a042" strokeWidth="2.69"/>
          <line x1="83.36" y1="326.95" x2="83.36" y2="405.84" stroke="#f9a042" strokeWidth="7.88"/>
          <rect x="85.25" y="362.84" width="7.28" height="8.59" fill="none" stroke="#f9a042" strokeWidth="2.87"/>
        </g>
      )}
    </g>
  );

  const renderTennisCourt = () => (
    <g>
      {/* Tennis Playing Area */}
      <rect x="134.67" y="125.48" width="1019" height="483" fill={getElementColor('tennis-playing-area', '#7b3522')}/> {/* Classic Red instead of #7a3422 */}
      
      {/* Tennis Court Lines */}
      <g stroke={getElementColor('tennis-lines', '#ffffff')} strokeWidth="5" fill="none"> {/* Brilliant White instead of #fff */}
        <line x1="132.6" y1="608.85" x2="132.6" y2="125.23"/>
        <line x1="1152.09" y1="125.23" x2="1152.09" y2="608.85"/>
        <line x1="1152.09" y1="608.85" x2="132.6" y2="608.85"/>
        <line x1="132.6" y1="125.23" x2="1152.09" y2="125.23"/>
        <line x1="1152.09" y1="539.18" x2="132.6" y2="539.18"/>
        <line x1="132.6" y1="196.23" x2="1152.09" y2="196.23"/>
        <line x1="919.99" y1="196.23" x2="919.99" y2="537.86" strokeWidth="7.07"/>
        <line x1="374.56" y1="367.04" x2="919.99" y2="367.04"/>
        <line x1="374.56" y1="537.86" x2="374.56" y2="196.23" strokeWidth="7.07"/>
      </g>
      
      {/* Tennis Net */}
      {showAccessories && (
        <g>
          <line x1="647.73" y1="105.89" x2="647.73" y2="639.69" stroke="#fbfcfc" strokeDasharray="0 0 0 0 0 0 13 21" strokeWidth="5.36"/>
          <circle cx="647.73" cy="93.09" r="12.79" fill="#fbfcfc"/>
          <circle cx="647.73" cy="639.69" r="12.79" fill="#fbfcfc"/>
        </g>
      )}
    </g>
  );

  const renderPickleballCourt = () => (
    <g>
      {/* Pickleball Kitchen */}
      <rect x="548.4" y="228.59" width="197.7" height="274.9" fill={getElementColor('pickleball-kitchen', '#233e6d')}/> {/* Standard Blue instead of #193f70 */}
      
      {/* Pickleball Service Areas */}
      <rect x="345.75" y="228.19" width="202.7" height="275.7" fill={getElementColor('pickleball-service-area', '#445f43')}/> {/* Competition Green instead of #405c3c */}
      <rect x="746.1" y="228.39" width="202.7" height="275.7" fill={getElementColor('pickleball-service-area', '#445f43')}/> {/* Competition Green instead of #405c3c */}
      
      {/* Pickleball Court Lines */}
      <g stroke={getElementColor('pickleball-lines', '#ffffff')} strokeWidth="3.28" fill="none"> {/* Brilliant White instead of #fff */}
        <line x1="948.8" y1="504.59" x2="345.8" y2="504.59"/>
        <line x1="345.8" y1="228.59" x2="948.75" y2="229.14"/>
        <line x1="345.8" y1="366.59" x2="548.4" y2="366.59"/>
        <line x1="746.15" y1="366.59" x2="948.75" y2="366.59"/>
        <line x1="345.8" y1="504.59" x2="345.8" y2="228.19" strokeWidth="4.64"/>
        <line x1="948.75" y1="505.34" x2="948.75" y2="229.14"/>
        <line x1="548.45" y1="228.19" x2="548.4" y2="504.59"/>
        <line x1="746.15" y1="504.59" x2="746.15" y2="228.19" strokeWidth="4.64"/>
      </g>
      
      {/* Pickleball Net */}
      {showAccessories && (
        <g>
          <line x1="648.8" y1="213.09" x2="649.4" y2="520.09" stroke="#fff" strokeDasharray="0 0 17 21" strokeWidth="3.28"/>
          <ellipse cx="648.8" cy="211.79" rx="9.5" ry="8.9" fill="#fafbfc"/>
          <ellipse cx="649.4" cy="523.49" rx="9.5" ry="8.9" fill="#fafbfc"/>
        </g>
      )}
    </g>
  );

  const renderOverlay = (courtType: CourtType) => {
    if (!overlays[courtType] || courtType === selectedCourt) return null;
    
    const opacity = 0.4;
    const overlayStroke = "#ffffff";
    const overlayStrokeWidth = "2";
    
    switch (courtType) {
      case 'tennis':
        return (
          <g opacity={opacity}>
            {/* Complete Tennis Court Boundary Lines */}
            <g stroke={overlayStroke} strokeWidth={overlayStrokeWidth} fill="none">
              {/* Outer boundary */}
              <line x1="132.6" y1="608.85" x2="132.6" y2="125.23"/>
              <line x1="1152.09" y1="125.23" x2="1152.09" y2="608.85"/>
              <line x1="1152.09" y1="608.85" x2="132.6" y2="608.85"/>
              <line x1="132.6" y1="125.23" x2="1152.09" y2="125.23"/>
              
              {/* Singles sidelines */}
              <line x1="1152.09" y1="539.18" x2="132.6" y2="539.18"/>
              <line x1="132.6" y1="196.23" x2="1152.09" y2="196.23"/>
              
              {/* Service lines and center line */}
              <line x1="919.99" y1="196.23" x2="919.99" y2="537.86" strokeWidth="3"/>
              <line x1="374.56" y1="367.04" x2="919.99" y2="367.04"/>
              <line x1="374.56" y1="537.86" x2="374.56" y2="196.23" strokeWidth="3"/>
            </g>
          </g>
        );
      case 'pickleball':
        return (
          <g opacity={opacity}>
            {/* Complete Pickleball Court Boundary Lines */}
            <g stroke={overlayStroke} strokeWidth={overlayStrokeWidth} fill="none">
              {/* Outer boundary */}
              <line x1="948.8" y1="504.59" x2="345.8" y2="504.59"/>
              <line x1="345.8" y1="228.59" x2="948.75" y2="229.14"/>
              <line x1="345.8" y1="504.59" x2="345.8" y2="228.19"/>
              <line x1="948.75" y1="505.34" x2="948.75" y2="229.14"/>
              
              {/* Center lines (service areas) */}
              <line x1="345.8" y1="366.59" x2="548.4" y2="366.59"/>
              <line x1="746.15" y1="366.59" x2="948.75" y2="366.59"/>
              
              {/* Non-volley zone lines (kitchen) */}
              <line x1="548.45" y1="228.19" x2="548.4" y2="504.59"/>
              <line x1="746.15" y1="504.59" x2="746.15" y2="228.19"/>
            </g>
          </g>
        );
      case 'basketball':
        return (
          <g opacity={opacity}>
            {/* Complete Basketball Court Boundary Lines */}
            <g stroke={overlayStroke} strokeWidth={overlayStrokeWidth} fill="none">
              {/* Outer boundary */}
              <line x1="1260.67" y1="45.41" x2="1260.67" y2="689.74"/>
              <line x1="37.3" y1="689.74" x2="37.3" y2="45.41"/>
              <line x1="1260.67" y1="689.74" x2="37.3" y2="689.74"/>
              <line x1="37.3" y1="45.41" x2="1260.67" y2="45.41"/>
              
              {/* Mid Court Line */}
              <line x1="648.98" y1="689.74" x2="648.98" y2="45.41"/>
              
              {/* Three Point Lines */}
              <path d="m1260.67,115.67c-17.2-3.45-41.76-.81-60-.81-145.93,0-264.38,112.02-264.38,255.17s118.46,251.56,264.38,251.56c19.75,0,40.45-.22,60,.22"/>
              <path d="m37.29,620.03h0c17.21,3.45,41.78.81,60.04.81,146,0,264.52-112.02,264.52-255.17S243.34,114.11,97.33,114.11c-19.76,0-40.47.22-60.04-.22"/>
              
              {/* Free throw areas */}
              <line x1="1015.63" y1="290.59" x2="1260.66" y2="290.59"/>
              <line x1="1260.66" y1="446.29" x2="1015.63" y2="446.29"/>
              <line x1="282.46" y1="445.1" x2="37.3" y2="445.1"/>
              <line x1="37.3" y1="289.41" x2="282.46" y2="289.41"/>
              
              {/* Free throw lines */}
              <line x1="1015.63" y1="446.29" x2="1015.63" y2="290.59"/>
              <line x1="282.46" y1="289.41" x2="282.46" y2="445.1"/>
              
              {/* Center Circle */}
              <circle cx="649.68" cy="367.85" r="77.14"/>
            </g>
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 1296.28 741.28" className="w-full h-auto" style={{ minHeight: '300px', maxHeight: '70vh' }}>
      {/* Base Court Background */}
      <rect 
        x="2.64" y="2.64" width="1290.99" height="735.99" 
        fill={getElementColor('base-background', '#6c6d6f')} // Standard Gray
        stroke="#241f20" 
        strokeWidth="5.29"
      />
      
      {/* Render selected court */}
      {selectedCourt === 'basketball' && renderBasketballCourt()}
      {selectedCourt === 'tennis' && renderTennisCourt()}
      {selectedCourt === 'pickleball' && renderPickleballCourt()}
      
      {/* Render overlays */}
      {renderOverlay('basketball')}
      {renderOverlay('tennis')}
      {renderOverlay('pickleball')}
    </svg>
  );
};

export default CourtSVG;
