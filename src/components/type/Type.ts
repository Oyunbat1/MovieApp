"use client"
import { use } from 'react';
import { useState } from 'react';
import React from 'react';

type Movie = {

    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    movieList: object
    detail: object
  };

  export default Movie