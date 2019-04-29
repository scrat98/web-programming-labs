<div class="col-12 my-1">
    <div class="card w-100">
        <div class="card-header">
            # {{ $id }}
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ $title }}</h5>
            <p class="card-text">{{ $text }}</p>
            <a href="/api/1.0/posts/delete/{{ $id }}">
                <button class="btn btn-danger">Delete post</button>
            </a>
        </div>
        <div class="card-footer text-muted">
            {{ $created_at }}
        </div>
    </div>
</div>
