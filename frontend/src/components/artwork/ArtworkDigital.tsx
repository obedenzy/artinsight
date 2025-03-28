import React from 'react';
        import { DetailedArtwork } from '../../types/artwork';
        import { Cpu, Palette } from 'lucide-react';

        interface Props {
          artwork: DetailedArtwork;
        }

        export function ArtworkDigital({ artwork }: Props) {
          if (!artwork.digitalInsights) return null;

          return (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-6 h-6 text-cyan-600" />
                <h2 className="text-2xl font-bold">Digital Insights</h2>
              </div>

              <div className="space-y-6">
                {artwork.digitalInsights.reconstruction && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Digital Reconstruction</h3>
                    <p className="text-gray-800">{artwork.digitalInsights.reconstruction}</p>
                  </div>
                )}

                {artwork.aiAnalysis && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                    <div className="space-y-3">
                      <div className="bg-cyan-50 p-4 rounded-lg">
                        <p className="text-sm text-cyan-700 mb-1">Authenticity Score</p>
                        <div className="w-full bg-cyan-200 rounded-full h-2">
                          <div
                            className="bg-cyan-600 h-2 rounded-full"
                            // Clamp the value to be between 0 and 1
                            style={{ width: `${Math.min(1, Math.max(0, artwork.aiAnalysis.authenticityScore)) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-cyan-700 mt-1">
                          {/* Also clamp here for display */}
                          {(Math.min(1, Math.max(0, artwork.aiAnalysis.authenticityScore)) * 100).toFixed(1)}% confidence
                        </p>
                      </div>

                      {artwork.aiAnalysis.hiddenDetails.length > 0 && (
                        <div className="bg-cyan-50 p-4 rounded-lg">
                          <p className="text-sm text-cyan-700 mb-2">Hidden Details Discovered</p>
                          <ul className="space-y-2">
                            {artwork.aiAnalysis.hiddenDetails.map((detail, index) => (
                              <li key={index} className="text-cyan-800">{detail}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Display Extracted Colors */}
              {artwork.colorPalette && artwork.colorPalette.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Dominant Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {artwork.colorPalette.map((color, index) => (
                        <div
                          key={index}
                          className="w-10 h-10 rounded-full"
                          style={{ backgroundColor: color }}
                          title={color}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}

                {artwork.digitalInsights.interactiveFeatures && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Interactive Features</h3>
                    <div className="grid gap-3">
                      {artwork.digitalInsights.interactiveFeatures.map((feature, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        }
