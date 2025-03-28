import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { GAME_TEMPLATES } from '../../data/gameTemplates';
import { BackButton } from '../../components/artwork/BackButton';
import { CreateGameForm } from './CreateGameForm';
import { ARTWORK_DATA } from '../../data/mockArtworks';
import { USER_ARTWORKS } from '../../data/mockUserArtworks';

export function CreateGame() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const artworkId = searchParams.get('artworkId');

  // Get artwork from either mock data or user artworks
  const artwork = USER_ARTWORKS.find(art => art.id === artworkId) || 
                 ARTWORK_DATA[artworkId as keyof typeof ARTWORK_DATA];

  // Get the selected game template
  const template = GAME_TEMPLATES.find(t => t.type === type);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Artwork not found</h1>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create a Game</h1>
              <p className="text-gray-600">
                Choose a game type for "{artwork.title}"
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GAME_TEMPLATES.map((template) => (
                <button
                  key={template.type}
                  onClick={() => navigate(`/games/create/${template.type}?artworkId=${artworkId}`)}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 text-purple-600">
                      {/* Icon will be rendered by the GameTemplateCard component */}
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-purple-600 transition-colors">
                      {template.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    {template.minQuestions}-{template.maxQuestions} questions
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create {template.title}</h1>
            <p className="text-gray-600">
              Based on "{artwork.title}" by {artwork.artist}
            </p>
          </div>

          <CreateGameForm template={template} artwork={artwork} />
        </div>
      </div>
    </div>
  );
}
