
// This is a mock implementation of prisma client for our Vite-based app
// In a real app, you would use Prisma with a database

const prisma = {
  user: {
    findUnique: async ({ where }: { where: any }) => {
      // Mock implementation
      return {
        id: where.id,
        role: 'free',
        postCount: 5
      };
    },
    update: async ({ where, data }: { where: any; data: any }) => {
      console.log('Updating user', where.id, 'with data', data);
      return {
        ...where,
        ...data
      };
    }
  },
  post: {
    create: async ({ data }: { data: any }) => {
      console.log('Creating post', data);
      return {
        id: `post-${Math.random().toString(36).substr(2, 9)}`,
        ...data,
        createdAt: new Date().toISOString()
      };
    },
    findMany: async ({ where, orderBy }: { where: any; orderBy: any }) => {
      // Mock posts
      return [
        {
          id: 'post-1',
          topic: 'Remote Work',
          tone: 'Professional',
          style: 'Storytelling',
          content: 'This is a mock post about remote work.',
          createdAt: new Date().toISOString(),
          userId: where?.userId
        }
      ];
    },
    delete: async ({ where }: { where: any }) => {
      console.log('Deleting post', where);
      return { id: where.id };
    }
  }
};

export default prisma;
