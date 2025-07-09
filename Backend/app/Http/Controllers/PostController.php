<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = \App\Models\Post::all();

        $posts = new PostResource($posts);

        return response()->json($posts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post = \App\Models\Post::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
        ]);

        // dd($post);
        $posts = new PostResource($post);
        return response()->json($posts);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = \App\Models\Post::find($id);

        $post = new PostResource($post);

        return response()->json($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = \App\Models\Post::find($id);

        if ($post) {
            $post->update([
                'title' => $request->input('title'),
                'content' => $request->input('content'),
            ]);

            return response()->json(new PostResource($post));
        }

        return response()->json(['message' => 'Post not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Post::destroy($id);

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
