
import React, { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlusCircle } from 'lucide-react';

const colorOptions = [
  { value: 'purple', label: 'Purple' },
  { value: 'blue', label: 'Blue' },
  { value: 'pink', label: 'Pink' },
  { value: 'green', label: 'Green' },
  { value: 'orange', label: 'Orange' },
  { value: 'red', label: 'Red' },
];

const AddCategoryDialog: React.FC = () => {
  const { addCategory } = useTaskContext();
  const [name, setName] = useState('');
  const [color, setColor] = useState<'purple' | 'blue' | 'pink' | 'green' | 'orange' | 'red'>('purple');
  const [open, setOpen] = useState(false);

  const handleAddCategory = () => {
    if (name.trim()) {
      addCategory({ name: name.trim(), color });
      setName('');
      setColor('purple');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle size={16} />
          New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>Create a new category to organize your tasks</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Category name"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Color
            </Label>
            <div className="col-span-3">
              <RadioGroup 
                value={color} 
                onValueChange={(value) => setColor(value as any)} 
                className="flex flex-wrap gap-3"
              >
                {colorOptions.map((option) => (
                  <div key={option.value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem 
                      value={option.value} 
                      id={option.value} 
                      className={`h-6 w-6 bg-taskflow-${option.value} border-taskflow-${option.value} text-white`}
                    />
                    <Label htmlFor={option.value} className={`text-xs text-taskflow-${option.value}`}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddCategory}>Add Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
