'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '~/components/ui/input';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '~/store/hooks';
import { InputPost } from './input-post';

export function HeaderInput() {
  const [isVisible, setIsVisible] = useState(false);

  const t = useTranslations('Header');

  const inputRef = useRef<HTMLInputElement>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const posts = useAppSelector((state) => state.postSlice.posts);

  const handleFocus = () => {
    setIsVisible(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        placeholder={t('input')}
        className="max-w-xl ml-40 bg-slate-200/65 hover:bg-slate-200 relative z-10 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
        onFocus={handleFocus}
      />
      {isVisible && (
        <div
          ref={dropdownRef}
          className="bg-white shadow-lg rounded-lg mt-2 absolute top-0 pt-12 w-full max-w-xl ml-40"
        >
          {posts.slice(0, 9).map((post) => (
            <InputPost key={post.id} {...post} setIsVisible={setIsVisible} />
          ))}
        </div>
      )}
    </div>
  );
}