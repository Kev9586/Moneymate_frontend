import React, { useState } from 'react';
import { Heading } from '../components/Typography';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/InputField';
import Select from '../components/atoms/Select';
import Chip from '../components/atoms/Chip';
import IconButton from '../components/atoms/IconButton';
import Badge from '../components/atoms/Badge';
import Card from '../components/molecules/Card';
import Modal from '../components/molecules/Modal';
import Toast from '../components/molecules/Toast';
import FAB from '../components/molecules/FAB';
import Tabs from '../components/molecules/Tabs';
import ProgressBar from '../components/molecules/ProgressBar';
import Carousel from '../components/organisms/Carousel';
import ThemeToggle from '../components/molecules/ThemeToggle';

const Playground = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);

  const selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  const tabs = [
    { label: 'Tab 1', content: <div>Content for Tab 1</div> },
    { label: 'Tab 2', content: <div>Content for Tab 2</div> },
  ];

  const carouselItems = [
    { title: 'Item 1', content: 'This is the first item.' },
    { title: 'Item 2', content: 'This is the second item.' },
    { title: 'Item 3', content: 'This is the third item.' },
  ];

  const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
    </svg>
  );

  return (
    <div className="p-10 space-y-8 bg-bgLight dark:bg-dark-bg">
      <div className="flex justify-between items-center">
        <Heading size="2xl">Component Playground</Heading>
        <ThemeToggle />
      </div>

      <Card>
        <Heading>Typography</Heading>
        <div className="space-y-2 mt-4">
          <Heading size="2xl">Section Heading (2xl)</Heading>
          <Heading size="lg">Card Title (lg)</Heading>
          <p className="text-base">Body text (base)</p>
          <p className="text-sm">Label text (sm)</p>
        </div>
      </Card>

      <Card>
        <Heading>Buttons</Heading>
        <div className="flex space-x-4 mt-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Card>

      <Card>
        <Heading>Input Fields</Heading>
        <div className="space-y-4 mt-4">
          <InputField placeholder="Standard Input" />
          <InputField placeholder="Error Input" error />
        </div>
      </Card>

      <Card>
        <Heading>Select</Heading>
        <div className="mt-4">
          <Select options={selectOptions} onSelect={(val) => console.log(val)} />
        </div>
      </Card>

      <Card>
        <Heading>Chips / Tags</Heading>
        <div className="flex space-x-4 mt-4">
          <Chip label="Filter 1" selected={selectedChip === 1} onSelect={() => setSelectedChip(1)} />
          <Chip label="Filter 2" selected={selectedChip === 2} onSelect={() => setSelectedChip(2)} />
        </div>
      </Card>

      <Card>
        <Heading>Icon Button</Heading>
        <div className="mt-4">
          <IconButton icon={<EditIcon />} onClick={() => alert('Icon button clicked!')} />
        </div>
      </Card>

      <Card>
        <Heading>Badge</Heading>
        <div className="flex space-x-4 mt-4">
          <Badge label="Active" />
          <Badge label="New" isNew />
        </div>
      </Card>

      <Card>
        <Heading>Modal</Heading>
        <div className="mt-4">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
            <Heading>Modal Title</Heading>
            <p className="mt-4">This is the content of the modal. Click outside to close.</p>
            <Button onClick={() => setModalOpen(false)} className="mt-4">Close</Button>
          </Modal>
        </div>
      </Card>

      <Card>
        <Heading>Toast</Heading>
        <div className="mt-4">
          <Button onClick={() => setShowToast(true)}>Show Toast</Button>
          <Toast message="This is a toast notification!" show={showToast} onDismiss={() => setShowToast(false)} />
        </div>
      </Card>

      <Card>
        <Heading>Tabs</Heading>
        <div className="mt-4">
          <Tabs tabs={tabs} />
        </div>
      </Card>

      <Card>
        <Heading>Progress Bar</Heading>
        <div className="mt-4">
          <ProgressBar progress={60} />
        </div>
      </Card>

      <Card>
        <Heading>Carousel</Heading>
        <div className="mt-4">
          <Carousel items={carouselItems} />
        </div>
      </Card>

      <FAB onClick={() => alert('FAB Clicked!')} />
    </div>
  );
};

export default Playground;