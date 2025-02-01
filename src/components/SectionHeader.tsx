interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
}

export function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <div className='flex items-center mb-4'>
      <div className='text-indigo-500 dark:text-white'>
        {icon}
      </div>
      <h2 className='ml-2 text-2xl font-semibold text-gray-900 dark:text-gray-100'>
        {title}
      </h2>
    </div>
  );
}