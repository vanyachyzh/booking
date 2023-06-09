import React, { useState } from 'react';
import { IconState } from '../../types';

const transition = { transition: 'stroke 300ms' }

type Props = {
  state: IconState,
};

export const CalendarUpIcon = ({ state }: Props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V12M16 3V7M8 3V7M4 11H20M19 22V16M19 16L22 19M19 16L16 19" style={transition} stroke={state} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const CalendarDownIcon = ({ state }: Props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V12M19 16V22M19 22L22 19M19 22L16 19M16 3V7M8 3V7M4 11H20" style={transition} stroke={state} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const MinusIcon = ({ state }: Props) => {
  return (
    <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2.49805H1C0.867392 2.49805 0.740215 2.44537 0.646447 2.3516C0.552678 2.25783 0.5 2.13065 0.5 1.99805C0.5 1.86544 0.552678 1.73826 0.646447 1.64449C0.740215 1.55073 0.867392 1.49805 1 1.49805H13C13.1326 1.49805 13.2598 1.55073 13.3536 1.64449C13.4473 1.73826 13.5 1.86544 13.5 1.99805C13.5 2.13066 13.4473 2.25783 13.3536 2.3516C13.2598 2.44537 13.1326 2.49805 13 2.49805Z" style={transition} stroke={state} />
    </svg>
  )
}

export const PlusIcon = ({ state }: Props) => {
  return (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 8.49805H7.5V8.99805V13.998C7.5 14.1307 7.44732 14.2578 7.35355 14.3516C7.25979 14.4454 7.13261 14.498 7 14.498C6.86739 14.498 6.74021 14.4454 6.64645 14.3516C6.55268 14.2578 6.5 14.1307 6.5 13.998V8.99805V8.49805H6H1C0.867392 8.49805 0.740215 8.44537 0.646447 8.3516C0.552678 8.25783 0.5 8.13065 0.5 7.99805C0.5 7.86544 0.552678 7.73826 0.646447 7.64449C0.740215 7.55073 0.867392 7.49805 1 7.49805H6H6.5V6.99805V1.99805C6.5 1.86544 6.55268 1.73826 6.64645 1.64449C6.74021 1.55073 6.86739 1.49805 7 1.49805C7.13261 1.49805 7.25979 1.55073 7.35355 1.64449C7.44732 1.73826 7.5 1.86544 7.5 1.99805V6.99805V7.49805H8H13C13.1326 7.49805 13.2598 7.55073 13.3536 7.64449C13.4473 7.73826 13.5 7.86544 13.5 7.99805C13.5 8.13066 13.4473 8.25783 13.3536 8.3516C13.2598 8.44537 13.1326 8.49805 13 8.49805H8Z" style={transition} stroke={state} />
    </svg>
  )
}


export const EyeIcon = ({ state }: Props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12Z" style={transition} stroke={state} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12C18.6 16 15.6 18 12 18C8.4 18 5.4 16 3 12C5.4 8 8.4 6 12 6C15.6 6 18.6 8 21 12Z" style={transition} stroke={state} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const MapIcon = ({ state }: Props) => {
  return (
    <svg className='search-bar__icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 11C9 11.7956 9.31607 12.5587 9.87868 13.1213C10.4413 13.6839 11.2044 14 12 14C12.7957 14 13.5587 13.6839 14.1213 13.1213C14.6839 12.5587 15 11.7956 15 11C15 10.2043 14.6839 9.44124 14.1213 8.87863C13.5587 8.31602 12.7957 7.99995 12 7.99995C11.2044 7.99995 10.4413 8.31602 9.87868 8.87863C9.31607 9.44124 9 10.2043 9 11Z" style={transition} stroke={state} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.657 16.657L13.414 20.9C13.039 21.2746 12.5306 21.485 12.0005 21.485C11.4704 21.485 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5381 4.46234 14.1127 4.15369 12.5608C3.84504 11.009 4.00349 9.40047 4.60901 7.93868C5.21452 6.4769 6.2399 5.22749 7.55548 4.34846C8.87107 3.46943 10.4178 3.00024 12 3.00024C13.5822 3.00024 15.1289 3.46943 16.4445 4.34846C17.7601 5.22749 18.7855 6.4769 19.391 7.93868C19.9965 9.40047 20.155 11.009 19.8463 12.5608C19.5377 14.1127 18.7758 15.5381 17.657 16.657Z" style={transition} stroke={state} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const MapIconBig = ({ state }: Props) => {
  return (
    <svg className='search-bar__icon-option' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 11C9 11.7956 9.31607 12.5587 9.87868 13.1213C10.4413 13.6839 11.2044 14 12 14C12.7957 14 13.5587 13.6839 14.1213 13.1213C14.6839 12.5587 15 11.7956 15 11C15 10.2043 14.6839 9.44124 14.1213 8.87863C13.5587 8.31602 12.7957 7.99995 12 7.99995C11.2044 7.99995 10.4413 8.31602 9.87868 8.87863C9.31607 9.44124 9 10.2043 9 11Z" style={transition} stroke={state} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.657 16.657L13.414 20.9C13.039 21.2746 12.5306 21.485 12.0005 21.485C11.4704 21.485 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5381 4.46234 14.1127 4.15369 12.5608C3.84504 11.009 4.00349 9.40047 4.60901 7.93868C5.21452 6.4769 6.2399 5.22749 7.55548 4.34846C8.87107 3.46943 10.4178 3.00024 12 3.00024C13.5822 3.00024 15.1289 3.46943 16.4445 4.34846C17.7601 5.22749 18.7855 6.4769 19.391 7.93868C19.9965 9.40047 20.155 11.009 19.8463 12.5608C19.5377 14.1127 18.7758 15.5381 17.657 16.657Z" style={transition} stroke={state} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}


export const DownIcon = ({ state }: Props) => {
  return (
    <svg className='category__icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke={state} style={transition} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const UpIcon = ({ state }: Props) => {
  return (
    <svg className='category__icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 15L12 9L18 15" stroke={state} style={transition} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}











