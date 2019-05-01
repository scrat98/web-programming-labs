@extends('layout')

@section('title', 'Posts list')

@section('content')
    <div class="container">
        <div class="row">
            @foreach ($posts as $post)
                @include('post', [
                 'id' => $post->id,
                 'title' => $post->title,
                 'text' => $post->text,
                 'created_at' => $post->created_at
                 ])
            @endforeach
        </div>
    </div>
@endsection
