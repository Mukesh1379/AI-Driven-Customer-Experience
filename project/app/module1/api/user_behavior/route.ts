import { NextResponse } from 'next/server';
import { PineconeClient } from '@pinecone-database/pinecone';
import { subDays } from 'date-fns';

const pinecone = new PineconeClient();

function generateHistoricalData(days: number) {
  return Array.from({ length: days }).map((_, i) => ({
    date: subDays(new Date(), i).toISOString(),
    views: Math.floor(Math.random() * 100) + 20,
    duration: Math.floor(Math.random() * 600) + 100,
  }));
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const timeRange = url.searchParams.get('timeRange') || '7d';
    
    const days = timeRange === '90d' ? 90 : timeRange === '30d' ? 30 : 7;

    const mockProfiles = [
      {
        id: '1',
        name: 'Emma Thompson',
        email: 'emma@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 145,
          timeOnSite: 450,
          interactions: ['product_view', 'cart_add', 'wishlist_add'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Fashion Enthusiast',
          interests: ['clothing', 'accessories', 'trends'],
          preferences: {
            communication: 'email',
            frequency: 'daily'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '2',
        name: 'James Wilson',
        email: 'james@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 89,
          timeOnSite: 320,
          interactions: ['blog_read', 'newsletter_signup', 'product_review'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Tech Professional',
          interests: ['gadgets', 'software', 'productivity'],
          preferences: {
            communication: 'sms',
            frequency: 'weekly'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '3',
        name: 'Sophia Chen',
        email: 'sophia@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 234,
          timeOnSite: 560,
          interactions: ['course_enrollment', 'video_watch', 'forum_post'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Student',
          interests: ['education', 'technology', 'books'],
          preferences: {
            communication: 'app',
            frequency: 'daily'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '4',
        name: 'Michael Rodriguez',
        email: 'michael@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 167,
          timeOnSite: 420,
          interactions: ['fitness_tracking', 'meal_plan', 'workout_complete'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Fitness Enthusiast',
          interests: ['health', 'nutrition', 'exercise'],
          preferences: {
            communication: 'sms',
            frequency: 'daily'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '5',
        name: 'Isabella Martinez',
        email: 'isabella@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 198,
          timeOnSite: 480,
          interactions: ['recipe_save', 'ingredient_purchase', 'review_post'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Food Blogger',
          interests: ['cooking', 'recipes', 'photography'],
          preferences: {
            communication: 'email',
            frequency: 'weekly'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '6',
        name: 'William Taylor',
        email: 'william@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 156,
          timeOnSite: 390,
          interactions: ['investment_research', 'portfolio_update', 'market_analysis'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Investor',
          interests: ['finance', 'stocks', 'cryptocurrency'],
          preferences: {
            communication: 'app',
            frequency: 'realtime'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '7',
        name: 'Olivia Brown',
        email: 'olivia@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 178,
          timeOnSite: 440,
          interactions: ['art_purchase', 'gallery_view', 'artist_follow'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Art Collector',
          interests: ['contemporary art', 'exhibitions', 'artists'],
          preferences: {
            communication: 'email',
            frequency: 'weekly'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '8',
        name: 'Ethan Parker',
        email: 'ethan@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 210,
          timeOnSite: 520,
          interactions: ['game_play', 'tournament_entry', 'team_join'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Gamer',
          interests: ['esports', 'streaming', 'competitive gaming'],
          preferences: {
            communication: 'discord',
            frequency: 'realtime'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '9',
        name: 'Ava Johnson',
        email: 'ava@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 145,
          timeOnSite: 380,
          interactions: ['travel_booking', 'itinerary_save', 'review_write'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Travel Enthusiast',
          interests: ['adventure', 'culture', 'photography'],
          preferences: {
            communication: 'email',
            frequency: 'weekly'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '10',
        name: 'Lucas Kim',
        email: 'lucas@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 189,
          timeOnSite: 460,
          interactions: ['music_stream', 'playlist_create', 'artist_follow'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Music Lover',
          interests: ['indie', 'concerts', 'vinyl'],
          preferences: {
            communication: 'app',
            frequency: 'daily'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '11',
        name: 'Sarah Anderson',
        email: 'sarah@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 167,
          timeOnSite: 410,
          interactions: ['project_create', 'team_invite', 'document_share'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Project Manager',
          interests: ['productivity', 'team management', 'agile'],
          preferences: {
            communication: 'slack',
            frequency: 'realtime'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '12',
        name: 'David Lee',
        email: 'david@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 223,
          timeOnSite: 540,
          interactions: ['code_commit', 'pull_request', 'issue_comment'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Developer',
          interests: ['open source', 'machine learning', 'web3'],
          preferences: {
            communication: 'github',
            frequency: 'daily'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '13',
        name: 'Mia Patel',
        email: 'mia@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 178,
          timeOnSite: 430,
          interactions: ['design_upload', 'client_feedback', 'project_complete'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Designer',
          interests: ['UI/UX', 'typography', 'branding'],
          preferences: {
            communication: 'email',
            frequency: 'weekly'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '14',
        name: 'Alexander White',
        email: 'alex@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 156,
          timeOnSite: 390,
          interactions: ['property_view', 'appointment_schedule', 'offer_submit'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Real Estate Agent',
          interests: ['property market', 'architecture', 'investment'],
          preferences: {
            communication: 'phone',
            frequency: 'realtime'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '15',
        name: 'Charlotte Davis',
        email: 'charlotte@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 198,
          timeOnSite: 470,
          interactions: ['event_planning', 'vendor_contact', 'budget_update'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Event Planner',
          interests: ['weddings', 'corporate events', 'decoration'],
          preferences: {
            communication: 'email',
            frequency: 'daily'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '16',
        name: 'Benjamin Foster',
        email: 'ben@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 167,
          timeOnSite: 420,
          interactions: ['photo_upload', 'album_create', 'print_order'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Photographer',
          interests: ['portrait', 'landscape', 'editing'],
          preferences: {
            communication: 'app',
            frequency: 'weekly'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '17',
        name: 'Victoria Scott',
        email: 'victoria@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 189,
          timeOnSite: 450,
          interactions: ['class_schedule', 'student_message', 'assignment_grade'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Teacher',
          interests: ['education', 'online learning', 'pedagogy'],
          preferences: {
            communication: 'email',
            frequency: 'daily'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '18',
        name: 'Henry Wilson',
        email: 'henry@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 210,
          timeOnSite: 500,
          interactions: ['research_paper', 'experiment_log', 'grant_application'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Scientist',
          interests: ['research', 'data analysis', 'publications'],
          preferences: {
            communication: 'email',
            frequency: 'weekly'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '19',
        name: 'Zoe Garcia',
        email: 'zoe@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 178,
          timeOnSite: 430,
          interactions: ['sustainability_pledge', 'recycling_log', 'community_event'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Environmental Activist',
          interests: ['sustainability', 'climate action', 'community'],
          preferences: {
            communication: 'app',
            frequency: 'daily'
          },
          lastUpdated: new Date().toISOString()
        }
      },
      {
        id: '20',
        name: 'Daniel Murphy',
        email: 'daniel@example.com',
        behavior: {
          lastActive: new Date().toISOString(),
          pageViews: 156,
          timeOnSite: 380,
          interactions: ['podcast_record', 'episode_edit', 'guest_schedule'],
          history: generateHistoricalData(days)
        },
        persona: {
          type: 'Podcaster',
          interests: ['audio production', 'storytelling', 'interviews'],
          preferences: {
            communication: 'slack',
            frequency: 'daily'
          },
          lastUpdated: new Date().toISOString()
        }
      }
    ];

    return NextResponse.json({ profiles: mockProfiles });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 }
    );
  }
}