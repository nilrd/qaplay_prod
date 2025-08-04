import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import testTypes from '../data/testTypes.json';

const Content = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (type) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedType(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Tipos de Teste em QA</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testTypes.map((type) => (
          <Card key={type.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => openModal(type)}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{type.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedType && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedType.title}</DialogTitle>
              <DialogDescription className="mt-2">
                {selectedType.full_text}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Exemplo Prático:</h3>
              <p className="text-muted-foreground mt-2">{selectedType.example}</p>
            </div>
            {selectedType.video_link && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Vídeo Explicativo:</h3>
                <div className="aspect-w-16 aspect-h-9 mt-2">
                  <iframe
                    src={selectedType.video_link}
                    title="Vídeo Explicativo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-md"
                  ></iframe>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Content;


