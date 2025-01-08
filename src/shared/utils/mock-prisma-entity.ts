import { randomUUID } from 'node:crypto';

type Id = {
  id: string;
};

type TimeStamps = {
  createdAt: Date;
  updatedAt: Date;
};

export class MockPrismaEntity<T> {
  db: (T & Id & TimeStamps)[] = [];

  async create({ data }: { data: T }) {
    const record = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.db.push(record);

    return record;
  }

  async findMany(params?: { where?: Partial<T & Id> }) {
    let results = [...this.db];

    if (params?.where) {
      results = results.filter((record) =>
        Object.entries(params.where!).every(
          ([key, value]) => record[key as keyof typeof record] === value,
        ),
      );
    }

    return results;
  }

  async findFirst(params?: { where?: Partial<T & Id> }) {
    let results = [...this.db];

    if (params?.where) {
      results = results.filter((record) =>
        Object.entries(params.where!).every(
          ([key, value]) => record[key as keyof typeof record] === value,
        ),
      );
    }

    return results[0] || null;
  }

  async findUnique({ where }: { where: Partial<T & Id> }) {
    return this.db.find((record) =>
      Object.entries(where).every(
        ([key, value]) => record[key as keyof typeof record] === value,
      ),
    );
  }

  async update({ where, data }: { where: Partial<T & Id>; data: Partial<T> }) {
    const record = await this.findUnique({ where });

    if (!record) {
      throw new Error('Record not found');
    }

    Object.assign(record, data, { updatedAt: new Date() });

    return record;
  }

  async delete({ where }: { where: Partial<T & Id> }) {
    const index = this.db.findIndex((record) =>
      Object.entries(where).every(
        ([key, value]) => record[key as keyof typeof record] === value,
      ),
    );

    if (index === -1) {
      throw new Error('Record not found');
    }

    const [deletedRecord] = this.db.splice(index, 1);
    return deletedRecord;
  }

  async count(params?: { where?: Partial<T & Id> }) {
    if (!params?.where) {
      return this.db.length;
    }

    return this.db.filter((record) =>
      Object.entries(params.where!).every(
        ([key, value]) => record[key as keyof typeof record] === value,
      ),
    ).length;
  }

  async aggregate({
    _sum,
    _count,
    where,
  }: {
    _sum: Partial<T & Id>;
    _count?: boolean;
    where?: Partial<T & Id>;
  }) {
    if (_count) {
      return { _count: await this.count({ where }) };
    }

    if (_sum) {
      return {
        _sum: this.db.reduce((acc, record) => {
          Object.keys(_sum).forEach((key) => {
            if (key in acc) {
              acc[key] += record[key];
            } else {
              acc[key] = record[key];
            }
          });
          return acc;
        }, {}),
      };
    }

    throw new Error('Unsupported aggregation type');
  }

  async groupBy({ by }: { by: string[]; _count?: Partial<T & Id> }) {
    const groups: Record<string, any>[] = [];

    this.db.forEach((record) => {
      by.forEach((byKey) => {
        const groupKey = record[byKey];

        const index = groups.findIndex((item) => item[byKey] === groupKey);

        if (index > -1) groups[index]._count.id += 1;
        else groups.push({ [byKey]: groupKey, _count: { id: 1 } });
      });
    });

    return groups;
  }
}
