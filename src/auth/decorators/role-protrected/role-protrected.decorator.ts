import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/auth/interfaces';

export const META_ROLES = 'roles';

export const RoleProtrected = (...roles: ValidRoles[]) => SetMetadata(META_ROLES, roles);
