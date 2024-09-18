import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { User } from 'src/user/schema/user.entities';
import type { Document } from 'mongoose';

export default function defaultRoles(user: User & Document<any, any, User>) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (user.role === 'admin') {
    can('manage', 'all');
  } else {
    //只能读取自己的信息以及更新一些字段
    can('read', 'User', { _id: user._id });
    can(
      'update',
      'User',
      ['avatar', 'phoneNumber', 'email', 'username', 'password'],
      { _id: user._id },
    );
    //work:创建，更新、删除自己的work
    can('create', 'Work', ['title', 'desc', 'content', 'coverImg']);
    can('read', 'Work', { user: user._id });
    can('update', 'Work', ['title', 'desc', 'content', 'coverImg'], {
      user: user._id,
    });
    can('delete', 'Work', { user: user._id });
    //channels，创建、更新、删除自己的channels
    can('create', 'Channels', ['name', 'workId'], { user: user._id });
    can('read', 'Channels', { user: user._id });
    can('update', 'Channels', ['name'], {
      user: user._id,
    });
    can('delete', 'Channels', ['name'], { user: user._id });
  }
  return build();
}
