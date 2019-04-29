<form method="POST" action="api/1.0/posts/create" class="my-3">
    {{ csrf_field() }}
    {{ method_field('POST') }}
    <div class="form-group">
        <label for="postTitle">The title</label>
        <input name="title" class="form-control" id="postTitle">
    </div>
    <div class="form-group">
        <label for="postTextArea">Post text</label>
        <textarea name="text" class="form-control" id="postTextArea" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
