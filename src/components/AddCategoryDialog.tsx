
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
        <Button variant="outline" className="gap-2 backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300">
          <PlusCircle size={16} className="text-taskflow-purple" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-taskflow-purple to-taskflow-blue">New Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] backdrop-blur-lg bg-white/70 border border-white/30 shadow-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light bg-clip-text text-transparent bg-gradient-to-r from-taskflow-purple to-taskflow-blue">
            Add New Category
          </DialogTitle>
          <DialogDescription className="text-muted-foreground/80">
            Create a new category to organize your tasks
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-muted-foreground/90">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 backdrop-blur-sm bg-white/40 border border-white/30 focus-visible:ring-taskflow-purple/50"
              placeholder="Category name"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2 text-muted-foreground/90">
              Color
            </Label>
            <div className="col-span-3">
              <RadioGroup 
                value={color} 
                onValueChange={(value) => setColor(value as any)} 
                className="flex flex-wrap gap-3"
              >
                {colorOptions.map((option) => (
                  <div key={option.value} className="flex flex-col items-center space-y-1 hover:scale-110 transition-transform duration-200">
                    <RadioGroupItem 
                      value={option.value} 
                      id={option.value} 
                      className={`h-8 w-8 bg-taskflow-${option.value} border-taskflow-${option.value} text-white ring-offset-2 ring-offset-background/50 shadow-lg shadow-taskflow-${option.value}/20`}
                    />
                    <Label htmlFor={option.value} className={`text-xs text-taskflow-${option.value} font-medium`}>
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
            <Button variant="outline" className="backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            onClick={handleAddCategory}
            className="bg-gradient-to-r from-taskflow-purple to-taskflow-blue hover:opacity-90 transition-opacity"
          >
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
