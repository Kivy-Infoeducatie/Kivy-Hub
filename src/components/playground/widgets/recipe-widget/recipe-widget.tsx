import React, { useState } from 'react';
import { useRecipeWidget } from '@/components/playground/widgets/recipe-widget/recipe-widget-context';
import { Selectable } from '@/components/playground/core/selectable';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function RecipeWidget() {
  const { recipe } = useRecipeWidget();
  const [currentPage, setCurrentPage] = useState(0);

  const pages = ['Nutrition', 'Ingredients', 'Steps'];
  const totalPages = pages.length;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 0: // Nutrition
        return (
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='rounded-lg bg-amber-50 p-4 border border-amber-200'>
                <p className='text-sm text-amber-600 font-medium mb-1'>Cook Time</p>
                <p className='text-2xl font-bold text-amber-800'>{recipe.cookTime}</p>
              </div>
              <div className='rounded-lg bg-blue-50 p-4 border border-blue-200'>
                <p className='text-sm text-blue-600 font-medium mb-1'>Serving Size</p>
                <p className='text-2xl font-bold text-blue-800'>{recipe.weight}</p>
              </div>
            </div>

            <div className='rounded-lg bg-gray-50 p-4'>
              <h3 className='mb-3 text-lg font-semibold text-gray-700'>
                Nutritional Info
              </h3>
              <div className='grid grid-cols-2 gap-3'>
                <div className='rounded bg-white p-3 text-center shadow-sm border border-gray-200'>
                  <p className='text-3xl font-bold text-gray-800'>
                    {recipe.nutritionalInfo.calories}
                  </p>
                  <p className='text-sm text-gray-600 mt-1'>calories</p>
                </div>
                <div className='rounded bg-white p-3 text-center shadow-sm border border-gray-200'>
                  <p className='text-3xl font-bold text-gray-800'>
                    {recipe.nutritionalInfo.protein}g
                  </p>
                  <p className='text-sm text-gray-600 mt-1'>protein</p>
                </div>
                <div className='rounded bg-white p-3 text-center shadow-sm border border-gray-200'>
                  <p className='text-3xl font-bold text-gray-800'>
                    {recipe.nutritionalInfo.carbs}g
                  </p>
                  <p className='text-sm text-gray-600 mt-1'>carbs</p>
                </div>
                <div className='rounded bg-white p-3 text-center shadow-sm border border-gray-200'>
                  <p className='text-3xl font-bold text-gray-800'>
                    {recipe.nutritionalInfo.fat}g
                  </p>
                  <p className='text-sm text-gray-600 mt-1'>fat</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Ingredients
        return (
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-gray-700'>
              Ingredients ({recipe.ingredients?.length || 0})
            </h3>
            <div className='space-y-2'>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className='flex items-center rounded-md bg-green-50 p-3 border border-green-200'
                  >
                    <span className='mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm text-white font-medium'>
                      {index + 1}
                    </span>
                    <p className='text-base text-gray-700'>{ingredient}</p>
                  </div>
                ))
              ) : (
                <p className='text-gray-500 text-center py-8'>No ingredients available</p>
              )}
            </div>
          </div>
        );

      case 2: // Steps
        return (
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-gray-700'>
              Preparation Steps ({recipe.steps.length})
            </h3>
            <div className='space-y-3'>
              {recipe.steps.map((step, index) => (
                <div
                  key={index}
                  className='rounded-md border border-blue-200 bg-blue-50 p-4 shadow-sm'
                >
                  <div className='flex items-start'>
                    <span className='mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-base text-white font-medium'>
                      {index + 1}
                    </span>
                    <p className='text-base text-gray-700 leading-relaxed'>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='fixed top-6 left-6'>
      <div className='w-[400px] rounded-3xl bg-white shadow-2xl overflow-hidden'>
        {/* Header */}
        <div className='bg-gradient-to-r from-green-500 to-emerald-600 p-6'>
          <h2 className='text-2xl font-bold text-white mb-2'>
            {recipe.title}
          </h2>
          <p className='text-sm text-green-50'>by {recipe.author}</p>
        </div>

        {/* Page Indicator */}
        <div className='flex justify-center gap-2 py-3 bg-gray-50 border-b border-gray-200'>
          {pages.map((page, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded-full text-xl font-medium transition-colors ${
                currentPage === index
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {page}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className='p-6 max-h-[60vh] overflow-y-auto'>
          {renderContent()}
        </div>

        {/* Navigation Buttons */}
        <div className='flex justify-between items-center p-4 bg-gray-50 border-t border-gray-200'>
          <Selectable
            onPrimaryPress={handlePrevious}
            enabled={currentPage > 0}
            className={`rounded-full p-3 flex items-center justify-center transition-colors ${
              currentPage > 0
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className='size-12 text-white' />
          </Selectable>

          <span className='text-xl font-medium text-gray-600'>
            {currentPage + 1} / {totalPages}
          </span>

          <Selectable
            onPrimaryPress={handleNext}
            enabled={currentPage < totalPages - 1}
            className={`rounded-full p-3 flex items-center justify-center transition-colors ${
              currentPage < totalPages - 1
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className='size-12 text-white' />
          </Selectable>
        </div>
      </div>
    </div>
  );
}
