import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1659289652131 implements MigrationInterface {
  name = 'init1659289652131';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" SERIAL NOT NULL, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_artists_artists" ("favoritesId" integer NOT NULL, "artistsId" uuid NOT NULL, CONSTRAINT "PK_66223ae7b354407f1992d1569e5" PRIMARY KEY ("favoritesId", "artistsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_80db6cf8e0b60a21a82563d6b4" ON "favorites_artists_artists" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_660eecabb197df0e6b0835554f" ON "favorites_artists_artists" ("artistsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_albums_albums" ("favoritesId" integer NOT NULL, "albumsId" uuid NOT NULL, CONSTRAINT "PK_64a7bf3ac232299b01062463fc0" PRIMARY KEY ("favoritesId", "albumsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_caee2f2437cd634201109549c2" ON "favorites_albums_albums" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4f68d4e307c3df157487b5f5c9" ON "favorites_albums_albums" ("albumsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_tracks_tracks" ("favoritesId" integer NOT NULL, "tracksId" uuid NOT NULL, CONSTRAINT "PK_e1d7ed5b143827263347ad6c43a" PRIMARY KEY ("favoritesId", "tracksId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cdb702f7ae63243bc8ffda8e0a" ON "favorites_tracks_tracks" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a68f39bdfc7688558ab5a2f389" ON "favorites_tracks_tracks" ("tracksId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artists" ADD CONSTRAINT "FK_80db6cf8e0b60a21a82563d6b48" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artists" ADD CONSTRAINT "FK_660eecabb197df0e6b0835554f6" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_albums" ADD CONSTRAINT "FK_caee2f2437cd634201109549c20" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_albums" ADD CONSTRAINT "FK_4f68d4e307c3df157487b5f5c94" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_tracks" ADD CONSTRAINT "FK_cdb702f7ae63243bc8ffda8e0aa" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_tracks" ADD CONSTRAINT "FK_a68f39bdfc7688558ab5a2f3892" FOREIGN KEY ("tracksId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_tracks" DROP CONSTRAINT "FK_a68f39bdfc7688558ab5a2f3892"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_tracks" DROP CONSTRAINT "FK_cdb702f7ae63243bc8ffda8e0aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_albums" DROP CONSTRAINT "FK_4f68d4e307c3df157487b5f5c94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_albums" DROP CONSTRAINT "FK_caee2f2437cd634201109549c20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artists" DROP CONSTRAINT "FK_660eecabb197df0e6b0835554f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artists" DROP CONSTRAINT "FK_80db6cf8e0b60a21a82563d6b48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a68f39bdfc7688558ab5a2f389"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cdb702f7ae63243bc8ffda8e0a"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_tracks_tracks"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4f68d4e307c3df157487b5f5c9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_caee2f2437cd634201109549c2"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_albums_albums"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_660eecabb197df0e6b0835554f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_80db6cf8e0b60a21a82563d6b4"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_artists_artists"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "favorites"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
    await queryRunner.query(`DROP TABLE "albums"`);
    await queryRunner.query(`DROP TABLE "artists"`);
  }
}
