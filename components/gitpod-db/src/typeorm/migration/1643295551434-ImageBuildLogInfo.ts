/**
 * Copyright (c) 2022 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import {MigrationInterface, QueryRunner} from "typeorm";
import { columnExists } from "./helper/helper";

export class ImageBuildLogInfo1643295551434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (!(await columnExists(queryRunner, "d_b_workspace", "imageBuildLogInfo"))) {
            await queryRunner.query("ALTER TABLE d_b_workspace ADD COLUMN `imageBuildLogInfo` text NULL");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
