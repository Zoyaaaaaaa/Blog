// import { NextResponse } from 'next/server';
// import { createClient } from '@/utils/supabase/client';

// const supabase = createClient(); // Initialize supabase client outside of the functions for reuse

// // GET: Fetch all blogs
// export async function GET(request: Request) {
//   try {
//     const { data, error } = await supabase.from('blogs').select('*');
//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch blogs.' }, { status: 500 });
//   }
// }

// // POST: Create a new blog
// export async function POST(request: Request) {
//   try {
//     const { title, content, user_id } = await request.json();
    
//     // Validate input
//     if (!title || !content || !user_id) {
//       return NextResponse.json({ error: 'Title, content, and user ID are required.' }, { status: 400 });
//     }

//     const { data, error } = await supabase
//       .from('blogs')
//       .insert([{ title, content, user_id,type }]);

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }

//     return NextResponse.json(data, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create blog.' }, { status: 500 });
//   }
// }

// // PUT: Update an existing blog
// export async function PUT(request: Request) {
//     try {
//       const { id, title, content } = await request.json();
  
//       // Validate incoming data
//       if (!id || !title || !content) {
//         return NextResponse.json({ error: 'ID, title, and content are required.' }, { status: 400 });
//       }
  
//       const { data, error } = await supabase
//         .from('blogs')
//         .update({ title, content })
//         .eq('id', id);
  
//       if (error) {
//         return NextResponse.json({ error: error.message }, { status: 400 });
//       }
  
//       return NextResponse.json(data);
//     } catch (error) {
//       console.error('Error in PUT request:', error);
//       return NextResponse.json({ error: 'Failed to update blog.' }, { status: 500 });
//     }
//   }
  

// // DELETE: Delete a blog
// export async function DELETE(request: Request) {
//   try {
//     const { id } = await request.json();

//     if (!id) {
//       return NextResponse.json({ error: 'Blog ID is required.' }, { status: 400 });
//     }

//     const { error } = await supabase.from('blogs').delete().eq('id', id);

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }

//     return NextResponse.json({ message: 'Blog deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to delete blog.' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient(); // Initialize supabase client outside of the functions for reuse

// GET: Fetch all blogs
export async function GET(request: Request) {
  try {
    const { data, error } = await supabase.from('blogs').select('*');
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs.' }, { status: 500 });
  }
}

// POST: Create a new blog
export async function POST(request: Request) {
  try {
    const { title, content, user_id, type } = await request.json();

    // Validate input
    if (!title || !content || !user_id || !type) {
      return NextResponse.json({ error: 'Title, content, user ID, and type are required.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('blogs')
      .insert([{ title, content, user_id, type }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog.' }, { status: 500 });
  }
}

// PUT: Update an existing blog
export async function PUT(request: Request) {
  try {
    const { id, title, content, type } = await request.json();

    // Validate incoming data
    if (!id || !title || !content || !type) {
      return NextResponse.json({ error: 'ID, title, content, and type are required.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('blogs')
      .update({ title, content, type })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PUT request:', error);
    return NextResponse.json({ error: 'Failed to update blog.' }, { status: 500 });
  }
}

// DELETE: Delete a blog
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required.' }, { status: 400 });
    }

    const { error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog.' }, { status: 500 });
  }
}
