@extends('layout')

@section('title', 'Posts list')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="d-flex justify-content-center">Posts</h1>
                @include('new-post-form')
            </div>
        </div>
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
