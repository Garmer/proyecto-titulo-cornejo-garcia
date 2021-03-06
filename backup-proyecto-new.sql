toc.dat                                                                                             0000600 0004000 0002000 00000145645 14063143475 0014465 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP                           y            proyecto    11.6    11.6 ?    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false         ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false         ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false         ?           1262    16393    proyecto    DATABASE     ?   CREATE DATABASE proyecto WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
    DROP DATABASE proyecto;
             postgres    false         ?            1259    31213    academicHistory    TABLE     C  CREATE TABLE public."academicHistory" (
    id integer NOT NULL,
    degree text NOT NULL,
    specialty text NOT NULL,
    college text NOT NULL,
    "psychologistId" integer NOT NULL,
    "urlDegreeCertificate" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 %   DROP TABLE public."academicHistory";
       public         postgres    false         ?            1259    31211    academicHistory_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."academicHistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."academicHistory_id_seq";
       public       postgres    false    205         ?           0    0    academicHistory_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."academicHistory_id_seq" OWNED BY public."academicHistory".id;
            public       postgres    false    204         ?            1259    32099    appointment    TABLE     T  CREATE TABLE public.appointment (
    id integer NOT NULL,
    "urlCall" text,
    "callPlatformId" integer NOT NULL,
    "appointmentScheduleId" integer NOT NULL,
    "parentId" integer NOT NULL,
    "statusAppointment" text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.appointment;
       public         postgres    false         ?            1259    32131    appointmentReview    TABLE       CREATE TABLE public."appointmentReview" (
    id integer NOT NULL,
    score double precision NOT NULL,
    comment text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "appointmentId" integer NOT NULL
);
 '   DROP TABLE public."appointmentReview";
       public         postgres    false         ?            1259    32123    appointmentReview_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."appointmentReview_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."appointmentReview_id_seq";
       public       postgres    false    229         ?           0    0    appointmentReview_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."appointmentReview_id_seq" OWNED BY public."appointmentReview".id;
            public       postgres    false    228         ?            1259    32060    appointmentSchedule    TABLE     W  CREATE TABLE public."appointmentSchedule" (
    id integer NOT NULL,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    "isReserved" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "psychologistId" integer NOT NULL
);
 )   DROP TABLE public."appointmentSchedule";
       public         postgres    false         ?            1259    32045    appointmentSchedule_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."appointmentSchedule_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."appointmentSchedule_id_seq";
       public       postgres    false    223         ?           0    0    appointmentSchedule_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."appointmentSchedule_id_seq" OWNED BY public."appointmentSchedule".id;
            public       postgres    false    221         ?            1259    32090    appointment_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.appointment_id_seq;
       public       postgres    false    225         ?           0    0    appointment_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.appointment_id_seq OWNED BY public.appointment.id;
            public       postgres    false    224         ?            1259    32011    callPlatform    TABLE     ?   CREATE TABLE public."callPlatform" (
    id integer NOT NULL,
    name text NOT NULL,
    "urlLogo" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."callPlatform";
       public         postgres    false         ?            1259    32004    callPlatform_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."callPlatform_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."callPlatform_id_seq";
       public       postgres    false    213         ?           0    0    callPlatform_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."callPlatform_id_seq" OWNED BY public."callPlatform".id;
            public       postgres    false    212         ?            1259    32114    child    TABLE       CREATE TABLE public.child (
    id integer NOT NULL,
    name text NOT NULL,
    "lastName" text NOT NULL,
    "dateOfBirth" date NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "parentId" integer NOT NULL
);
    DROP TABLE public.child;
       public         postgres    false         ?            1259    32100    child_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.child_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.child_id_seq;
       public       postgres    false    227         ?           0    0    child_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.child_id_seq OWNED BY public.child.id;
            public       postgres    false    226         ?            1259    31999    gender    TABLE     ?   CREATE TABLE public.gender (
    id integer NOT NULL,
    name text,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.gender;
       public         postgres    false         ?            1259    31994    gender_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.gender_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.gender_id_seq;
       public       postgres    false    211         ?           0    0    gender_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.gender_id_seq OWNED BY public.gender.id;
            public       postgres    false    208         ?            1259    32043 	   languages    TABLE     ?   CREATE TABLE public.languages (
    id integer NOT NULL,
    name text NOT NULL,
    code text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.languages;
       public         postgres    false         ?            1259    32035    languages_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.languages_id_seq;
       public       postgres    false    219         ?           0    0    languages_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;
            public       postgres    false    214         ?            1259    27128    parent    TABLE       CREATE TABLE public.parent (
    id integer NOT NULL,
    rut text NOT NULL,
    "dateOfBirth" date NOT NULL,
    "phoneNumber" text,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.parent;
       public         postgres    false         ?            1259    27121    parent_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.parent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.parent_id_seq;
       public       postgres    false    201         ?           0    0    parent_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.parent_id_seq OWNED BY public.parent.id;
            public       postgres    false    200         ?            1259    31997 	   pathology    TABLE     ?   CREATE TABLE public.pathology (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.pathology;
       public         postgres    false         ?            1259    31993    pathology_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.pathology_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.pathology_id_seq;
       public       postgres    false    209         ?           0    0    pathology_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.pathology_id_seq OWNED BY public.pathology.id;
            public       postgres    false    207         ?            1259    27107 
   permission    TABLE     ?   CREATE TABLE public.permission (
    id integer NOT NULL,
    permission text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.permission;
       public         postgres    false         ?            1259    27101    permission_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.permission_id_seq;
       public       postgres    false    197         ?           0    0    permission_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;
            public       postgres    false    196         ?            1259    27146    psychologist    TABLE       CREATE TABLE public.psychologist (
    id integer NOT NULL,
    "urlProfilePicture" text DEFAULT 'https://proyecto-files.s3-sa-east-1.amazonaws.com/blank-profile-picture-973460_960_720.webp'::text,
    description text,
    "locationId" integer,
    rut text NOT NULL,
    "isVerified" boolean NOT NULL,
    "workModelId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer NOT NULL,
    "verificationInProcess" boolean DEFAULT false,
    "genderId" integer
);
     DROP TABLE public.psychologist;
       public         postgres    false         ?            1259    32044    psychologistCallPlatform    TABLE     ?   CREATE TABLE public."psychologistCallPlatform" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "psychologistId" integer,
    "callPlatformId" integer
);
 .   DROP TABLE public."psychologistCallPlatform";
       public         postgres    false         ?            1259    32039    psychologistCallPlatform_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."psychologistCallPlatform_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."psychologistCallPlatform_id_seq";
       public       postgres    false    220         ?           0    0    psychologistCallPlatform_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."psychologistCallPlatform_id_seq" OWNED BY public."psychologistCallPlatform".id;
            public       postgres    false    216         ?            1259    32053    psychologistLanguage    TABLE     ?   CREATE TABLE public."psychologistLanguage" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "psychologistId" integer,
    "languageId" integer
);
 *   DROP TABLE public."psychologistLanguage";
       public         postgres    false         ?            1259    32042    psychologistLanguage_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."psychologistLanguage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."psychologistLanguage_id_seq";
       public       postgres    false    222                     0    0    psychologistLanguage_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."psychologistLanguage_id_seq" OWNED BY public."psychologistLanguage".id;
            public       postgres    false    218         ?            1259    32040    psychologistPathology    TABLE     ?   CREATE TABLE public."psychologistPathology" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "psychologistId" integer,
    "pathologyId" integer
);
 +   DROP TABLE public."psychologistPathology";
       public         postgres    false         ?            1259    32037    psychologistPathology_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."psychologistPathology_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public."psychologistPathology_id_seq";
       public       postgres    false    217                    0    0    psychologistPathology_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."psychologistPathology_id_seq" OWNED BY public."psychologistPathology".id;
            public       postgres    false    215         ?            1259    27138    psychologist_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.psychologist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.psychologist_id_seq;
       public       postgres    false    203                    0    0    psychologist_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.psychologist_id_seq OWNED BY public.psychologist.id;
            public       postgres    false    202         ?            1259    32160    recoverPassword    TABLE     +  CREATE TABLE public."recoverPassword" (
    id integer NOT NULL,
    "expirationDate" timestamp with time zone,
    code text,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer NOT NULL
);
 %   DROP TABLE public."recoverPassword";
       public         postgres    false         ?            1259    32149    recoverPassword_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."recoverPassword_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."recoverPassword_id_seq";
       public       postgres    false    233                    0    0    recoverPassword_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."recoverPassword_id_seq" OWNED BY public."recoverPassword".id;
            public       postgres    false    231         ?            1259    27120    user    TABLE     h  CREATE TABLE public."user" (
    id integer NOT NULL,
    name text NOT NULL,
    "lastName" text NOT NULL,
    mail text NOT NULL,
    password text NOT NULL,
    "isMailVerified" boolean,
    "verificationCode" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "permissionId" integer NOT NULL
);
    DROP TABLE public."user";
       public         postgres    false         ?            1259    27118    user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public       postgres    false    199                    0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
            public       postgres    false    198         ?            1259    32158    workHistory    TABLE     c  CREATE TABLE public."workHistory" (
    id integer NOT NULL,
    "position" text NOT NULL,
    company text NOT NULL,
    "descriptionOfActivity" text NOT NULL,
    "startDate" date NOT NULL,
    "endDate" date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "psychologistId" integer NOT NULL
);
 !   DROP TABLE public."workHistory";
       public         postgres    false         ?            1259    32145    workHistory_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."workHistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."workHistory_id_seq";
       public       postgres    false    232                    0    0    workHistory_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."workHistory_id_seq" OWNED BY public."workHistory".id;
            public       postgres    false    230         ?            1259    31998 	   workModel    TABLE     ?   CREATE TABLE public."workModel" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."workModel";
       public         postgres    false         ?            1259    31991    workModel_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."workModel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."workModel_id_seq";
       public       postgres    false    210                    0    0    workModel_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."workModel_id_seq" OWNED BY public."workModel".id;
            public       postgres    false    206         ?
           2604    31216    academicHistory id    DEFAULT     |   ALTER TABLE ONLY public."academicHistory" ALTER COLUMN id SET DEFAULT nextval('public."academicHistory_id_seq"'::regclass);
 C   ALTER TABLE public."academicHistory" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    205    204    205         	           2604    32112    appointment id    DEFAULT     p   ALTER TABLE ONLY public.appointment ALTER COLUMN id SET DEFAULT nextval('public.appointment_id_seq'::regclass);
 =   ALTER TABLE public.appointment ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    225    224    225                    2604    32147    appointmentReview id    DEFAULT     ?   ALTER TABLE ONLY public."appointmentReview" ALTER COLUMN id SET DEFAULT nextval('public."appointmentReview_id_seq"'::regclass);
 E   ALTER TABLE public."appointmentReview" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    228    229    229                    2604    32074    appointmentSchedule id    DEFAULT     ?   ALTER TABLE ONLY public."appointmentSchedule" ALTER COLUMN id SET DEFAULT nextval('public."appointmentSchedule_id_seq"'::regclass);
 G   ALTER TABLE public."appointmentSchedule" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    223    221    223                    2604    32018    callPlatform id    DEFAULT     v   ALTER TABLE ONLY public."callPlatform" ALTER COLUMN id SET DEFAULT nextval('public."callPlatform_id_seq"'::regclass);
 @   ALTER TABLE public."callPlatform" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    213    212    213         
           2604    32124    child id    DEFAULT     d   ALTER TABLE ONLY public.child ALTER COLUMN id SET DEFAULT nextval('public.child_id_seq'::regclass);
 7   ALTER TABLE public.child ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    227    226    227                    2604    32010 	   gender id    DEFAULT     f   ALTER TABLE ONLY public.gender ALTER COLUMN id SET DEFAULT nextval('public.gender_id_seq'::regclass);
 8   ALTER TABLE public.gender ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    211    208    211                    2604    32058    languages id    DEFAULT     l   ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);
 ;   ALTER TABLE public.languages ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    214    219    219         ?
           2604    27132 	   parent id    DEFAULT     f   ALTER TABLE ONLY public.parent ALTER COLUMN id SET DEFAULT nextval('public.parent_id_seq'::regclass);
 8   ALTER TABLE public.parent ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    201    200    201         ?
           2604    32005    pathology id    DEFAULT     l   ALTER TABLE ONLY public.pathology ALTER COLUMN id SET DEFAULT nextval('public.pathology_id_seq'::regclass);
 ;   ALTER TABLE public.pathology ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    207    209    209         ?
           2604    27111    permission id    DEFAULT     n   ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);
 <   ALTER TABLE public.permission ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    196    197    197         ?
           2604    27150    psychologist id    DEFAULT     r   ALTER TABLE ONLY public.psychologist ALTER COLUMN id SET DEFAULT nextval('public.psychologist_id_seq'::regclass);
 >   ALTER TABLE public.psychologist ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    202    203    203                    2604    32057    psychologistCallPlatform id    DEFAULT     ?   ALTER TABLE ONLY public."psychologistCallPlatform" ALTER COLUMN id SET DEFAULT nextval('public."psychologistCallPlatform_id_seq"'::regclass);
 L   ALTER TABLE public."psychologistCallPlatform" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    220    216    220                    2604    32065    psychologistLanguage id    DEFAULT     ?   ALTER TABLE ONLY public."psychologistLanguage" ALTER COLUMN id SET DEFAULT nextval('public."psychologistLanguage_id_seq"'::regclass);
 H   ALTER TABLE public."psychologistLanguage" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    222    218    222                    2604    32049    psychologistPathology id    DEFAULT     ?   ALTER TABLE ONLY public."psychologistPathology" ALTER COLUMN id SET DEFAULT nextval('public."psychologistPathology_id_seq"'::regclass);
 I   ALTER TABLE public."psychologistPathology" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    217    215    217                    2604    32179    recoverPassword id    DEFAULT     |   ALTER TABLE ONLY public."recoverPassword" ALTER COLUMN id SET DEFAULT nextval('public."recoverPassword_id_seq"'::regclass);
 C   ALTER TABLE public."recoverPassword" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    231    233    233         ?
           2604    27125    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    198    199    199                    2604    32176    workHistory id    DEFAULT     t   ALTER TABLE ONLY public."workHistory" ALTER COLUMN id SET DEFAULT nextval('public."workHistory_id_seq"'::regclass);
 ?   ALTER TABLE public."workHistory" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    232    230    232                     2604    32006    workModel id    DEFAULT     p   ALTER TABLE ONLY public."workModel" ALTER COLUMN id SET DEFAULT nextval('public."workModel_id_seq"'::regclass);
 =   ALTER TABLE public."workModel" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    210    206    210         ?          0    31213    academicHistory 
   TABLE DATA               ?   COPY public."academicHistory" (id, degree, specialty, college, "psychologistId", "urlDegreeCertificate", "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    205       3025.dat ?          0    32099    appointment 
   TABLE DATA               ?   COPY public.appointment (id, "urlCall", "callPlatformId", "appointmentScheduleId", "parentId", "statusAppointment", "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    225       3045.dat ?          0    32131    appointmentReview 
   TABLE DATA               l   COPY public."appointmentReview" (id, score, comment, "createdAt", "updatedAt", "appointmentId") FROM stdin;
    public       postgres    false    229       3049.dat ?          0    32060    appointmentSchedule 
   TABLE DATA               ?   COPY public."appointmentSchedule" (id, "startDate", "endDate", "isReserved", "createdAt", "updatedAt", "psychologistId") FROM stdin;
    public       postgres    false    223       3043.dat ?          0    32011    callPlatform 
   TABLE DATA               W   COPY public."callPlatform" (id, name, "urlLogo", "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    213       3033.dat ?          0    32114    child 
   TABLE DATA               j   COPY public.child (id, name, "lastName", "dateOfBirth", "createdAt", "updatedAt", "parentId") FROM stdin;
    public       postgres    false    227       3047.dat ?          0    31999    gender 
   TABLE DATA               Q   COPY public.gender (id, name, description, "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    211       3031.dat ?          0    32043 	   languages 
   TABLE DATA               M   COPY public.languages (id, name, code, "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    219       3039.dat ?          0    27128    parent 
   TABLE DATA               k   COPY public.parent (id, rut, "dateOfBirth", "phoneNumber", "userId", "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    201       3021.dat ?          0    31997 	   pathology 
   TABLE DATA               T   COPY public.pathology (id, name, description, "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    209       3029.dat ?          0    27107 
   permission 
   TABLE DATA               N   COPY public.permission (id, permission, "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    197       3017.dat ?          0    27146    psychologist 
   TABLE DATA               ?   COPY public.psychologist (id, "urlProfilePicture", description, "locationId", rut, "isVerified", "workModelId", "createdAt", "updatedAt", "userId", "verificationInProcess", "genderId") FROM stdin;
    public       postgres    false    203       3023.dat ?          0    32044    psychologistCallPlatform 
   TABLE DATA               v   COPY public."psychologistCallPlatform" (id, "createdAt", "updatedAt", "psychologistId", "callPlatformId") FROM stdin;
    public       postgres    false    220       3040.dat ?          0    32053    psychologistLanguage 
   TABLE DATA               n   COPY public."psychologistLanguage" (id, "createdAt", "updatedAt", "psychologistId", "languageId") FROM stdin;
    public       postgres    false    222       3042.dat ?          0    32040    psychologistPathology 
   TABLE DATA               p   COPY public."psychologistPathology" (id, "createdAt", "updatedAt", "psychologistId", "pathologyId") FROM stdin;
    public       postgres    false    217       3037.dat ?          0    32160    recoverPassword 
   TABLE DATA               w   COPY public."recoverPassword" (id, "expirationDate", code, "isActive", "createdAt", "updatedAt", "userId") FROM stdin;
    public       postgres    false    233       3053.dat ?          0    27120    user 
   TABLE DATA               ?   COPY public."user" (id, name, "lastName", mail, password, "isMailVerified", "verificationCode", "createdAt", "updatedAt", "permissionId") FROM stdin;
    public       postgres    false    199       3019.dat ?          0    32158    workHistory 
   TABLE DATA               ?   COPY public."workHistory" (id, "position", company, "descriptionOfActivity", "startDate", "endDate", "createdAt", "updatedAt", "psychologistId") FROM stdin;
    public       postgres    false    232       3052.dat ?          0    31998 	   workModel 
   TABLE DATA               V   COPY public."workModel" (id, name, description, "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    210       3030.dat            0    0    academicHistory_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."academicHistory_id_seq"', 2, true);
            public       postgres    false    204                    0    0    appointmentReview_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."appointmentReview_id_seq"', 1, false);
            public       postgres    false    228         	           0    0    appointmentSchedule_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."appointmentSchedule_id_seq"', 1, false);
            public       postgres    false    221         
           0    0    appointment_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.appointment_id_seq', 1, false);
            public       postgres    false    224                    0    0    callPlatform_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."callPlatform_id_seq"', 1, false);
            public       postgres    false    212                    0    0    child_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.child_id_seq', 1, false);
            public       postgres    false    226                    0    0    gender_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.gender_id_seq', 1, false);
            public       postgres    false    208                    0    0    languages_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.languages_id_seq', 1, false);
            public       postgres    false    214                    0    0    parent_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.parent_id_seq', 2, true);
            public       postgres    false    200                    0    0    pathology_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.pathology_id_seq', 1, false);
            public       postgres    false    207                    0    0    permission_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.permission_id_seq', 3, true);
            public       postgres    false    196                    0    0    psychologistCallPlatform_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."psychologistCallPlatform_id_seq"', 1, false);
            public       postgres    false    216                    0    0    psychologistLanguage_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."psychologistLanguage_id_seq"', 1, false);
            public       postgres    false    218                    0    0    psychologistPathology_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."psychologistPathology_id_seq"', 1, false);
            public       postgres    false    215                    0    0    psychologist_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.psychologist_id_seq', 2, true);
            public       postgres    false    202                    0    0    recoverPassword_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."recoverPassword_id_seq"', 1, false);
            public       postgres    false    231                    0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 29, true);
            public       postgres    false    198                    0    0    workHistory_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."workHistory_id_seq"', 1, false);
            public       postgres    false    230                    0    0    workModel_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."workModel_id_seq"', 1, false);
            public       postgres    false    206                    2606    31221 $   academicHistory academicHistory_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."academicHistory"
    ADD CONSTRAINT "academicHistory_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."academicHistory" DROP CONSTRAINT "academicHistory_pkey";
       public         postgres    false    205         6           2606    32192 (   appointmentReview appointmentReview_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."appointmentReview"
    ADD CONSTRAINT "appointmentReview_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."appointmentReview" DROP CONSTRAINT "appointmentReview_pkey";
       public         postgres    false    229         0           2606    32079 ,   appointmentSchedule appointmentSchedule_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."appointmentSchedule"
    ADD CONSTRAINT "appointmentSchedule_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."appointmentSchedule" DROP CONSTRAINT "appointmentSchedule_pkey";
       public         postgres    false    223         2           2606    32142    appointment appointment_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.appointment DROP CONSTRAINT appointment_pkey;
       public         postgres    false    225                     2606    32031    callPlatform callPlatform_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."callPlatform"
    ADD CONSTRAINT "callPlatform_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."callPlatform" DROP CONSTRAINT "callPlatform_pkey";
       public         postgres    false    213         4           2606    32162    child child_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.child
    ADD CONSTRAINT child_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.child DROP CONSTRAINT child_pkey;
       public         postgres    false    227                    2606    32032    gender gender_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.gender
    ADD CONSTRAINT gender_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.gender DROP CONSTRAINT gender_pkey;
       public         postgres    false    211         &           2606    32086    languages languages_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.languages DROP CONSTRAINT languages_pkey;
       public         postgres    false    219                    2606    27147    parent parent_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.parent
    ADD CONSTRAINT parent_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.parent DROP CONSTRAINT parent_pkey;
       public         postgres    false    201                    2606    32034    pathology pathology_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.pathology
    ADD CONSTRAINT pathology_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.pathology DROP CONSTRAINT pathology_pkey;
       public         postgres    false    209                    2606    27117    permission permission_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.permission DROP CONSTRAINT permission_pkey;
       public         postgres    false    197         (           2606    32069 6   psychologistCallPlatform psychologistCallPlatform_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public."psychologistCallPlatform"
    ADD CONSTRAINT "psychologistCallPlatform_pkey" PRIMARY KEY (id);
 d   ALTER TABLE ONLY public."psychologistCallPlatform" DROP CONSTRAINT "psychologistCallPlatform_pkey";
       public         postgres    false    220         *           2606    32080 S   psychologistCallPlatform psychologistCallPlatform_psychologistId_callPlatformId_key 
   CONSTRAINT     ?   ALTER TABLE ONLY public."psychologistCallPlatform"
    ADD CONSTRAINT "psychologistCallPlatform_psychologistId_callPlatformId_key" UNIQUE ("psychologistId", "callPlatformId");
 ?   ALTER TABLE ONLY public."psychologistCallPlatform" DROP CONSTRAINT "psychologistCallPlatform_psychologistId_callPlatformId_key";
       public         postgres    false    220    220         ,           2606    32077 .   psychologistLanguage psychologistLanguage_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public."psychologistLanguage"
    ADD CONSTRAINT "psychologistLanguage_pkey" PRIMARY KEY (id);
 \   ALTER TABLE ONLY public."psychologistLanguage" DROP CONSTRAINT "psychologistLanguage_pkey";
       public         postgres    false    222         .           2606    32083 G   psychologistLanguage psychologistLanguage_psychologistId_languageId_key 
   CONSTRAINT     ?   ALTER TABLE ONLY public."psychologistLanguage"
    ADD CONSTRAINT "psychologistLanguage_psychologistId_languageId_key" UNIQUE ("psychologistId", "languageId");
 u   ALTER TABLE ONLY public."psychologistLanguage" DROP CONSTRAINT "psychologistLanguage_psychologistId_languageId_key";
       public         postgres    false    222    222         "           2606    32062 0   psychologistPathology psychologistPathology_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public."psychologistPathology"
    ADD CONSTRAINT "psychologistPathology_pkey" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public."psychologistPathology" DROP CONSTRAINT "psychologistPathology_pkey";
       public         postgres    false    217         $           2606    32072 J   psychologistPathology psychologistPathology_psychologistId_pathologyId_key 
   CONSTRAINT     ?   ALTER TABLE ONLY public."psychologistPathology"
    ADD CONSTRAINT "psychologistPathology_psychologistId_pathologyId_key" UNIQUE ("psychologistId", "pathologyId");
 x   ALTER TABLE ONLY public."psychologistPathology" DROP CONSTRAINT "psychologistPathology_psychologistId_pathologyId_key";
       public         postgres    false    217    217                    2606    27160    psychologist psychologist_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.psychologist
    ADD CONSTRAINT psychologist_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.psychologist DROP CONSTRAINT psychologist_pkey;
       public         postgres    false    203         :           2606    32205 $   recoverPassword recoverPassword_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."recoverPassword"
    ADD CONSTRAINT "recoverPassword_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."recoverPassword" DROP CONSTRAINT "recoverPassword_pkey";
       public         postgres    false    233                    2606    27137    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public         postgres    false    199         8           2606    32193    workHistory workHistory_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."workHistory"
    ADD CONSTRAINT "workHistory_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."workHistory" DROP CONSTRAINT "workHistory_pkey";
       public         postgres    false    232                    2606    32033    workModel workModel_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."workModel"
    ADD CONSTRAINT "workModel_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."workModel" DROP CONSTRAINT "workModel_pkey";
       public         postgres    false    210         @           2606    32248 3   academicHistory academicHistory_psychologistId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."academicHistory"
    ADD CONSTRAINT "academicHistory_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 a   ALTER TABLE ONLY public."academicHistory" DROP CONSTRAINT "academicHistory_psychologistId_fkey";
       public       postgres    false    2838    205    203         L           2606    32268 6   appointmentReview appointmentReview_appointmentId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."appointmentReview"
    ADD CONSTRAINT "appointmentReview_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES public.appointment(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 d   ALTER TABLE ONLY public."appointmentReview" DROP CONSTRAINT "appointmentReview_appointmentId_fkey";
       public       postgres    false    229    2866    225         G           2606    32283 ;   appointmentSchedule appointmentSchedule_psychologistId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."appointmentSchedule"
    ADD CONSTRAINT "appointmentSchedule_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 i   ALTER TABLE ONLY public."appointmentSchedule" DROP CONSTRAINT "appointmentSchedule_psychologistId_fkey";
       public       postgres    false    203    2838    223         H           2606    32253 2   appointment appointment_appointmentScheduleId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "appointment_appointmentScheduleId_fkey" FOREIGN KEY ("appointmentScheduleId") REFERENCES public."appointmentSchedule"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ^   ALTER TABLE ONLY public.appointment DROP CONSTRAINT "appointment_appointmentScheduleId_fkey";
       public       postgres    false    2864    225    223         J           2606    32223 +   appointment appointment_callPlatformId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "appointment_callPlatformId_fkey" FOREIGN KEY ("callPlatformId") REFERENCES public."callPlatform"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 W   ALTER TABLE ONLY public.appointment DROP CONSTRAINT "appointment_callPlatformId_fkey";
       public       postgres    false    225    2848    213         I           2606    32288 %   appointment appointment_parentId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "appointment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.parent(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.appointment DROP CONSTRAINT "appointment_parentId_fkey";
       public       postgres    false    225    2836    201         K           2606    32278    child child_parentId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.child
    ADD CONSTRAINT "child_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.parent(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.child DROP CONSTRAINT "child_parentId_fkey";
       public       postgres    false    227    201    2836         <           2606    32243    parent parent_userId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.parent
    ADD CONSTRAINT "parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.parent DROP CONSTRAINT "parent_userId_fkey";
       public       postgres    false    199    201    2834         D           2606    32273 E   psychologistCallPlatform psychologistCallPlatform_callPlatformId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."psychologistCallPlatform"
    ADD CONSTRAINT "psychologistCallPlatform_callPlatformId_fkey" FOREIGN KEY ("callPlatformId") REFERENCES public."callPlatform"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 s   ALTER TABLE ONLY public."psychologistCallPlatform" DROP CONSTRAINT "psychologistCallPlatform_callPlatformId_fkey";
       public       postgres    false    213    220    2848         C           2606    32233 E   psychologistCallPlatform psychologistCallPlatform_psychologistId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."psychologistCallPlatform"
    ADD CONSTRAINT "psychologistCallPlatform_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE CASCADE;
 s   ALTER TABLE ONLY public."psychologistCallPlatform" DROP CONSTRAINT "psychologistCallPlatform_psychologistId_fkey";
       public       postgres    false    220    2838    203         F           2606    32258 9   psychologistLanguage psychologistLanguage_languageId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."psychologistLanguage"
    ADD CONSTRAINT "psychologistLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public.languages(id) ON UPDATE CASCADE ON DELETE CASCADE;
 g   ALTER TABLE ONLY public."psychologistLanguage" DROP CONSTRAINT "psychologistLanguage_languageId_fkey";
       public       postgres    false    2854    219    222         E           2606    32238 =   psychologistLanguage psychologistLanguage_psychologistId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."psychologistLanguage"
    ADD CONSTRAINT "psychologistLanguage_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE CASCADE;
 k   ALTER TABLE ONLY public."psychologistLanguage" DROP CONSTRAINT "psychologistLanguage_psychologistId_fkey";
       public       postgres    false    203    222    2838         A           2606    32263 <   psychologistPathology psychologistPathology_pathologyId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."psychologistPathology"
    ADD CONSTRAINT "psychologistPathology_pathologyId_fkey" FOREIGN KEY ("pathologyId") REFERENCES public.pathology(id) ON UPDATE CASCADE ON DELETE CASCADE;
 j   ALTER TABLE ONLY public."psychologistPathology" DROP CONSTRAINT "psychologistPathology_pathologyId_fkey";
       public       postgres    false    209    217    2842         B           2606    32228 ?   psychologistPathology psychologistPathology_psychologistId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."psychologistPathology"
    ADD CONSTRAINT "psychologistPathology_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE CASCADE;
 m   ALTER TABLE ONLY public."psychologistPathology" DROP CONSTRAINT "psychologistPathology_psychologistId_fkey";
       public       postgres    false    203    217    2838         =           2606    32212 '   psychologist psychologist_genderId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.psychologist
    ADD CONSTRAINT "psychologist_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES public.gender(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public.psychologist DROP CONSTRAINT "psychologist_genderId_fkey";
       public       postgres    false    211    203    2846         >           2606    32313 %   psychologist psychologist_userId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.psychologist
    ADD CONSTRAINT "psychologist_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.psychologist DROP CONSTRAINT "psychologist_userId_fkey";
       public       postgres    false    199    2834    203         ?           2606    32298 *   psychologist psychologist_workModelId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.psychologist
    ADD CONSTRAINT "psychologist_workModelId_fkey" FOREIGN KEY ("workModelId") REFERENCES public."workModel"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.psychologist DROP CONSTRAINT "psychologist_workModelId_fkey";
       public       postgres    false    2844    210    203         N           2606    32293 +   recoverPassword recoverPassword_userId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."recoverPassword"
    ADD CONSTRAINT "recoverPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Y   ALTER TABLE ONLY public."recoverPassword" DROP CONSTRAINT "recoverPassword_userId_fkey";
       public       postgres    false    233    199    2834         ;           2606    32308    user user_permissionId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "user_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public.permission(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."user" DROP CONSTRAINT "user_permissionId_fkey";
       public       postgres    false    199    197    2832         M           2606    32303 +   workHistory workHistory_psychologistId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."workHistory"
    ADD CONSTRAINT "workHistory_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Y   ALTER TABLE ONLY public."workHistory" DROP CONSTRAINT "workHistory_psychologistId_fkey";
       public       postgres    false    2838    232    203                                                                                                   3025.dat                                                                                            0000600 0004000 0002000 00000000324 14063143475 0014251 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	Psicología	adultos	Pontificia unviersidad católica de valparaíso	2	https://proyecto-files.s3-sa-east-1.amazonaws.com/_1621456112597-application.pdf	2021-05-19 18:25:45.148-03	2021-05-19 18:25:45.148-03
\.


                                                                                                                                                                                                                                                                                                            3045.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014247 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3049.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3043.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014245 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3033.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014244 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3047.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014251 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3031.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014242 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3039.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014252 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3021.dat                                                                                            0000600 0004000 0002000 00000000142 14063143475 0014243 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	19234064-0	1960-12-08	+5698320475	28	2021-05-05 16:14:52.202-03	2021-05-05 16:14:52.202-03
\.


                                                                                                                                                                                                                                                                                                                                                                                                                              3029.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014251 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3017.dat                                                                                            0000600 0004000 0002000 00000000307 14063143475 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	admin	2021-05-03 18:34:00.746-03	2021-05-03 18:34:04.598-03
3	parent	2021-05-05 09:01:24.318-03	2021-05-05 09:01:26.342-03
2	psychologist	2021-05-05 09:01:14.896-03	2021-05-05 09:01:17.137-03
\.


                                                                                                                                                                                                                                                                                                                         3023.dat                                                                                            0000600 0004000 0002000 00000000136 14063143475 0014250 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	\N	\N	\N	19234064-0	f	\N	2021-05-15 20:36:23.824-03	2021-05-15 20:36:23.824-03	29	f	\N
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                  3040.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014242 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3042.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014244 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3037.dat                                                                                            0000600 0004000 0002000 00000000005 14063143475 0014250 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3053.dat                                                                                            0000600 0004000 0002000 00000000005 14063143476 0014247 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3019.dat                                                                                            0000600 0004000 0002000 00000000540 14063143476 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        29	ricardo	cornejo	ricardocornejo1995@gmail.co	$2b$10$ZVnTIVfwUCS7tZi4Amlx6uQR2p8jok/94ShTNiqM3At/Q2fDl4oQ2	f	601933	2021-05-15 20:36:23.789-03	2021-05-15 20:36:23.789-03	2
28	ricardo	cornejo	ricardocornejo1995@gmail.com	$2b$10$0RR6M/QFgXUduHD3kHsHx.5g.nH3Cmlii.lx.5g2.TRI/HhA8FH46	t	111612	2021-05-05 16:14:52.171-03	2021-05-15 21:38:33.347-03	3
\.


                                                                                                                                                                3052.dat                                                                                            0000600 0004000 0002000 00000000005 14063143476 0014246 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3030.dat                                                                                            0000600 0004000 0002000 00000000005 14063143476 0014242 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           restore.sql                                                                                         0000600 0004000 0002000 00000122205 14063143476 0015376 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6
-- Dumped by pg_dump version 11.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE proyecto;
--
-- Name: proyecto; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE proyecto WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';


ALTER DATABASE proyecto OWNER TO postgres;

\connect proyecto

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: academicHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."academicHistory" (
    id integer NOT NULL,
    degree text NOT NULL,
    specialty text NOT NULL,
    college text NOT NULL,
    "psychologistId" integer NOT NULL,
    "urlDegreeCertificate" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."academicHistory" OWNER TO postgres;

--
-- Name: academicHistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."academicHistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."academicHistory_id_seq" OWNER TO postgres;

--
-- Name: academicHistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."academicHistory_id_seq" OWNED BY public."academicHistory".id;


--
-- Name: appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment (
    id integer NOT NULL,
    "urlCall" text,
    "callPlatformId" integer NOT NULL,
    "appointmentScheduleId" integer NOT NULL,
    "parentId" integer NOT NULL,
    "statusAppointment" text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.appointment OWNER TO postgres;

--
-- Name: appointmentReview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."appointmentReview" (
    id integer NOT NULL,
    score double precision NOT NULL,
    comment text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "appointmentId" integer NOT NULL
);


ALTER TABLE public."appointmentReview" OWNER TO postgres;

--
-- Name: appointmentReview_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."appointmentReview_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."appointmentReview_id_seq" OWNER TO postgres;

--
-- Name: appointmentReview_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."appointmentReview_id_seq" OWNED BY public."appointmentReview".id;


--
-- Name: appointmentSchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."appointmentSchedule" (
    id integer NOT NULL,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    "isReserved" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "psychologistId" integer NOT NULL
);


ALTER TABLE public."appointmentSchedule" OWNER TO postgres;

--
-- Name: appointmentSchedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."appointmentSchedule_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."appointmentSchedule_id_seq" OWNER TO postgres;

--
-- Name: appointmentSchedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."appointmentSchedule_id_seq" OWNED BY public."appointmentSchedule".id;


--
-- Name: appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appointment_id_seq OWNER TO postgres;

--
-- Name: appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointment_id_seq OWNED BY public.appointment.id;


--
-- Name: callPlatform; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."callPlatform" (
    id integer NOT NULL,
    name text NOT NULL,
    "urlLogo" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."callPlatform" OWNER TO postgres;

--
-- Name: callPlatform_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."callPlatform_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."callPlatform_id_seq" OWNER TO postgres;

--
-- Name: callPlatform_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."callPlatform_id_seq" OWNED BY public."callPlatform".id;


--
-- Name: child; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.child (
    id integer NOT NULL,
    name text NOT NULL,
    "lastName" text NOT NULL,
    "dateOfBirth" date NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "parentId" integer NOT NULL
);


ALTER TABLE public.child OWNER TO postgres;

--
-- Name: child_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.child_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.child_id_seq OWNER TO postgres;

--
-- Name: child_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.child_id_seq OWNED BY public.child.id;


--
-- Name: gender; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gender (
    id integer NOT NULL,
    name text,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.gender OWNER TO postgres;

--
-- Name: gender_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gender_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gender_id_seq OWNER TO postgres;

--
-- Name: gender_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gender_id_seq OWNED BY public.gender.id;


--
-- Name: languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.languages (
    id integer NOT NULL,
    name text NOT NULL,
    code text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.languages OWNER TO postgres;

--
-- Name: languages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.languages_id_seq OWNER TO postgres;

--
-- Name: languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;


--
-- Name: parent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parent (
    id integer NOT NULL,
    rut text NOT NULL,
    "dateOfBirth" date NOT NULL,
    "phoneNumber" text,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.parent OWNER TO postgres;

--
-- Name: parent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parent_id_seq OWNER TO postgres;

--
-- Name: parent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parent_id_seq OWNED BY public.parent.id;


--
-- Name: pathology; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pathology (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.pathology OWNER TO postgres;

--
-- Name: pathology_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pathology_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pathology_id_seq OWNER TO postgres;

--
-- Name: pathology_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pathology_id_seq OWNED BY public.pathology.id;


--
-- Name: permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permission (
    id integer NOT NULL,
    permission text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.permission OWNER TO postgres;

--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permission_id_seq OWNER TO postgres;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


--
-- Name: psychologist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.psychologist (
    id integer NOT NULL,
    "urlProfilePicture" text DEFAULT 'https://proyecto-files.s3-sa-east-1.amazonaws.com/blank-profile-picture-973460_960_720.webp'::text,
    description text,
    "locationId" integer,
    rut text NOT NULL,
    "isVerified" boolean NOT NULL,
    "workModelId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer NOT NULL,
    "verificationInProcess" boolean DEFAULT false,
    "genderId" integer
);


ALTER TABLE public.psychologist OWNER TO postgres;

--
-- Name: psychologistCallPlatform; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."psychologistCallPlatform" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "psychologistId" integer,
    "callPlatformId" integer
);


ALTER TABLE public."psychologistCallPlatform" OWNER TO postgres;

--
-- Name: psychologistCallPlatform_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."psychologistCallPlatform_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."psychologistCallPlatform_id_seq" OWNER TO postgres;

--
-- Name: psychologistCallPlatform_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."psychologistCallPlatform_id_seq" OWNED BY public."psychologistCallPlatform".id;


--
-- Name: psychologistLanguage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."psychologistLanguage" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "psychologistId" integer,
    "languageId" integer
);


ALTER TABLE public."psychologistLanguage" OWNER TO postgres;

--
-- Name: psychologistLanguage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."psychologistLanguage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."psychologistLanguage_id_seq" OWNER TO postgres;

--
-- Name: psychologistLanguage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."psychologistLanguage_id_seq" OWNED BY public."psychologistLanguage".id;


--
-- Name: psychologistPathology; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."psychologistPathology" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "psychologistId" integer,
    "pathologyId" integer
);


ALTER TABLE public."psychologistPathology" OWNER TO postgres;

--
-- Name: psychologistPathology_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."psychologistPathology_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."psychologistPathology_id_seq" OWNER TO postgres;

--
-- Name: psychologistPathology_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."psychologistPathology_id_seq" OWNED BY public."psychologistPathology".id;


--
-- Name: psychologist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.psychologist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.psychologist_id_seq OWNER TO postgres;

--
-- Name: psychologist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.psychologist_id_seq OWNED BY public.psychologist.id;


--
-- Name: recoverPassword; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."recoverPassword" (
    id integer NOT NULL,
    "expirationDate" timestamp with time zone,
    code text,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."recoverPassword" OWNER TO postgres;

--
-- Name: recoverPassword_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."recoverPassword_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."recoverPassword_id_seq" OWNER TO postgres;

--
-- Name: recoverPassword_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."recoverPassword_id_seq" OWNED BY public."recoverPassword".id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name text NOT NULL,
    "lastName" text NOT NULL,
    mail text NOT NULL,
    password text NOT NULL,
    "isMailVerified" boolean,
    "verificationCode" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "permissionId" integer NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: workHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."workHistory" (
    id integer NOT NULL,
    "position" text NOT NULL,
    company text NOT NULL,
    "descriptionOfActivity" text NOT NULL,
    "startDate" date NOT NULL,
    "endDate" date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "psychologistId" integer NOT NULL
);


ALTER TABLE public."workHistory" OWNER TO postgres;

--
-- Name: workHistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."workHistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."workHistory_id_seq" OWNER TO postgres;

--
-- Name: workHistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."workHistory_id_seq" OWNED BY public."workHistory".id;


--
-- Name: workModel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."workModel" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."workModel" OWNER TO postgres;

--
-- Name: workModel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."workModel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."workModel_id_seq" OWNER TO postgres;

--
-- Name: workModel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."workModel_id_seq" OWNED BY public."workModel".id;


--
-- Name: academicHistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."academicHistory" ALTER COLUMN id SET DEFAULT nextval('public."academicHistory_id_seq"'::regclass);


--
-- Name: appointment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment ALTER COLUMN id SET DEFAULT nextval('public.appointment_id_seq'::regclass);


--
-- Name: appointmentReview id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."appointmentReview" ALTER COLUMN id SET DEFAULT nextval('public."appointmentReview_id_seq"'::regclass);


--
-- Name: appointmentSchedule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."appointmentSchedule" ALTER COLUMN id SET DEFAULT nextval('public."appointmentSchedule_id_seq"'::regclass);


--
-- Name: callPlatform id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."callPlatform" ALTER COLUMN id SET DEFAULT nextval('public."callPlatform_id_seq"'::regclass);


--
-- Name: child id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child ALTER COLUMN id SET DEFAULT nextval('public.child_id_seq'::regclass);


--
-- Name: gender id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gender ALTER COLUMN id SET DEFAULT nextval('public.gender_id_seq'::regclass);


--
-- Name: languages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);


--
-- Name: parent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent ALTER COLUMN id SET DEFAULT nextval('public.parent_id_seq'::regclass);


--
-- Name: pathology id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pathology ALTER COLUMN id SET DEFAULT nextval('public.pathology_id_seq'::regclass);


--
-- Name: permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- Name: psychologist id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.psychologist ALTER COLUMN id SET DEFAULT nextval('public.psychologist_id_seq'::regclass);


--
-- Name: psychologistCallPlatform id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistCallPlatform" ALTER COLUMN id SET DEFAULT nextval('public."psychologistCallPlatform_id_seq"'::regclass);


--
-- Name: psychologistLanguage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistLanguage" ALTER COLUMN id SET DEFAULT nextval('public."psychologistLanguage_id_seq"'::regclass);


--
-- Name: psychologistPathology id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistPathology" ALTER COLUMN id SET DEFAULT nextval('public."psychologistPathology_id_seq"'::regclass);


--
-- Name: recoverPassword id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."recoverPassword" ALTER COLUMN id SET DEFAULT nextval('public."recoverPassword_id_seq"'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: workHistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."workHistory" ALTER COLUMN id SET DEFAULT nextval('public."workHistory_id_seq"'::regclass);


--
-- Name: workModel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."workModel" ALTER COLUMN id SET DEFAULT nextval('public."workModel_id_seq"'::regclass);


--
-- Data for Name: academicHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."academicHistory" (id, degree, specialty, college, "psychologistId", "urlDegreeCertificate", "createdAt", "updatedAt") FROM stdin;
\.
COPY public."academicHistory" (id, degree, specialty, college, "psychologistId", "urlDegreeCertificate", "createdAt", "updatedAt") FROM '$$PATH$$/3025.dat';

--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointment (id, "urlCall", "callPlatformId", "appointmentScheduleId", "parentId", "statusAppointment", "createdAt", "updatedAt") FROM stdin;
\.
COPY public.appointment (id, "urlCall", "callPlatformId", "appointmentScheduleId", "parentId", "statusAppointment", "createdAt", "updatedAt") FROM '$$PATH$$/3045.dat';

--
-- Data for Name: appointmentReview; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."appointmentReview" (id, score, comment, "createdAt", "updatedAt", "appointmentId") FROM stdin;
\.
COPY public."appointmentReview" (id, score, comment, "createdAt", "updatedAt", "appointmentId") FROM '$$PATH$$/3049.dat';

--
-- Data for Name: appointmentSchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."appointmentSchedule" (id, "startDate", "endDate", "isReserved", "createdAt", "updatedAt", "psychologistId") FROM stdin;
\.
COPY public."appointmentSchedule" (id, "startDate", "endDate", "isReserved", "createdAt", "updatedAt", "psychologistId") FROM '$$PATH$$/3043.dat';

--
-- Data for Name: callPlatform; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."callPlatform" (id, name, "urlLogo", "createdAt", "updatedAt") FROM stdin;
\.
COPY public."callPlatform" (id, name, "urlLogo", "createdAt", "updatedAt") FROM '$$PATH$$/3033.dat';

--
-- Data for Name: child; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.child (id, name, "lastName", "dateOfBirth", "createdAt", "updatedAt", "parentId") FROM stdin;
\.
COPY public.child (id, name, "lastName", "dateOfBirth", "createdAt", "updatedAt", "parentId") FROM '$$PATH$$/3047.dat';

--
-- Data for Name: gender; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gender (id, name, description, "createdAt", "updatedAt") FROM stdin;
\.
COPY public.gender (id, name, description, "createdAt", "updatedAt") FROM '$$PATH$$/3031.dat';

--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.languages (id, name, code, "createdAt", "updatedAt") FROM stdin;
\.
COPY public.languages (id, name, code, "createdAt", "updatedAt") FROM '$$PATH$$/3039.dat';

--
-- Data for Name: parent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parent (id, rut, "dateOfBirth", "phoneNumber", "userId", "createdAt", "updatedAt") FROM stdin;
\.
COPY public.parent (id, rut, "dateOfBirth", "phoneNumber", "userId", "createdAt", "updatedAt") FROM '$$PATH$$/3021.dat';

--
-- Data for Name: pathology; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pathology (id, name, description, "createdAt", "updatedAt") FROM stdin;
\.
COPY public.pathology (id, name, description, "createdAt", "updatedAt") FROM '$$PATH$$/3029.dat';

--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permission (id, permission, "createdAt", "updatedAt") FROM stdin;
\.
COPY public.permission (id, permission, "createdAt", "updatedAt") FROM '$$PATH$$/3017.dat';

--
-- Data for Name: psychologist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.psychologist (id, "urlProfilePicture", description, "locationId", rut, "isVerified", "workModelId", "createdAt", "updatedAt", "userId", "verificationInProcess", "genderId") FROM stdin;
\.
COPY public.psychologist (id, "urlProfilePicture", description, "locationId", rut, "isVerified", "workModelId", "createdAt", "updatedAt", "userId", "verificationInProcess", "genderId") FROM '$$PATH$$/3023.dat';

--
-- Data for Name: psychologistCallPlatform; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."psychologistCallPlatform" (id, "createdAt", "updatedAt", "psychologistId", "callPlatformId") FROM stdin;
\.
COPY public."psychologistCallPlatform" (id, "createdAt", "updatedAt", "psychologistId", "callPlatformId") FROM '$$PATH$$/3040.dat';

--
-- Data for Name: psychologistLanguage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."psychologistLanguage" (id, "createdAt", "updatedAt", "psychologistId", "languageId") FROM stdin;
\.
COPY public."psychologistLanguage" (id, "createdAt", "updatedAt", "psychologistId", "languageId") FROM '$$PATH$$/3042.dat';

--
-- Data for Name: psychologistPathology; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."psychologistPathology" (id, "createdAt", "updatedAt", "psychologistId", "pathologyId") FROM stdin;
\.
COPY public."psychologistPathology" (id, "createdAt", "updatedAt", "psychologistId", "pathologyId") FROM '$$PATH$$/3037.dat';

--
-- Data for Name: recoverPassword; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."recoverPassword" (id, "expirationDate", code, "isActive", "createdAt", "updatedAt", "userId") FROM stdin;
\.
COPY public."recoverPassword" (id, "expirationDate", code, "isActive", "createdAt", "updatedAt", "userId") FROM '$$PATH$$/3053.dat';

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, "lastName", mail, password, "isMailVerified", "verificationCode", "createdAt", "updatedAt", "permissionId") FROM stdin;
\.
COPY public."user" (id, name, "lastName", mail, password, "isMailVerified", "verificationCode", "createdAt", "updatedAt", "permissionId") FROM '$$PATH$$/3019.dat';

--
-- Data for Name: workHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."workHistory" (id, "position", company, "descriptionOfActivity", "startDate", "endDate", "createdAt", "updatedAt", "psychologistId") FROM stdin;
\.
COPY public."workHistory" (id, "position", company, "descriptionOfActivity", "startDate", "endDate", "createdAt", "updatedAt", "psychologistId") FROM '$$PATH$$/3052.dat';

--
-- Data for Name: workModel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."workModel" (id, name, description, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."workModel" (id, name, description, "createdAt", "updatedAt") FROM '$$PATH$$/3030.dat';

--
-- Name: academicHistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."academicHistory_id_seq"', 2, true);


--
-- Name: appointmentReview_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."appointmentReview_id_seq"', 1, false);


--
-- Name: appointmentSchedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."appointmentSchedule_id_seq"', 1, false);


--
-- Name: appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointment_id_seq', 1, false);


--
-- Name: callPlatform_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."callPlatform_id_seq"', 1, false);


--
-- Name: child_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.child_id_seq', 1, false);


--
-- Name: gender_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gender_id_seq', 1, false);


--
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.languages_id_seq', 1, false);


--
-- Name: parent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parent_id_seq', 2, true);


--
-- Name: pathology_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pathology_id_seq', 1, false);


--
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permission_id_seq', 3, true);


--
-- Name: psychologistCallPlatform_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."psychologistCallPlatform_id_seq"', 1, false);


--
-- Name: psychologistLanguage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."psychologistLanguage_id_seq"', 1, false);


--
-- Name: psychologistPathology_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."psychologistPathology_id_seq"', 1, false);


--
-- Name: psychologist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.psychologist_id_seq', 2, true);


--
-- Name: recoverPassword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."recoverPassword_id_seq"', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 29, true);


--
-- Name: workHistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."workHistory_id_seq"', 1, false);


--
-- Name: workModel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."workModel_id_seq"', 1, false);


--
-- Name: academicHistory academicHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."academicHistory"
    ADD CONSTRAINT "academicHistory_pkey" PRIMARY KEY (id);


--
-- Name: appointmentReview appointmentReview_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."appointmentReview"
    ADD CONSTRAINT "appointmentReview_pkey" PRIMARY KEY (id);


--
-- Name: appointmentSchedule appointmentSchedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."appointmentSchedule"
    ADD CONSTRAINT "appointmentSchedule_pkey" PRIMARY KEY (id);


--
-- Name: appointment appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_pkey PRIMARY KEY (id);


--
-- Name: callPlatform callPlatform_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."callPlatform"
    ADD CONSTRAINT "callPlatform_pkey" PRIMARY KEY (id);


--
-- Name: child child_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child
    ADD CONSTRAINT child_pkey PRIMARY KEY (id);


--
-- Name: gender gender_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gender
    ADD CONSTRAINT gender_pkey PRIMARY KEY (id);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: parent parent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent
    ADD CONSTRAINT parent_pkey PRIMARY KEY (id);


--
-- Name: pathology pathology_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pathology
    ADD CONSTRAINT pathology_pkey PRIMARY KEY (id);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: psychologistCallPlatform psychologistCallPlatform_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistCallPlatform"
    ADD CONSTRAINT "psychologistCallPlatform_pkey" PRIMARY KEY (id);


--
-- Name: psychologistCallPlatform psychologistCallPlatform_psychologistId_callPlatformId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistCallPlatform"
    ADD CONSTRAINT "psychologistCallPlatform_psychologistId_callPlatformId_key" UNIQUE ("psychologistId", "callPlatformId");


--
-- Name: psychologistLanguage psychologistLanguage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistLanguage"
    ADD CONSTRAINT "psychologistLanguage_pkey" PRIMARY KEY (id);


--
-- Name: psychologistLanguage psychologistLanguage_psychologistId_languageId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistLanguage"
    ADD CONSTRAINT "psychologistLanguage_psychologistId_languageId_key" UNIQUE ("psychologistId", "languageId");


--
-- Name: psychologistPathology psychologistPathology_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistPathology"
    ADD CONSTRAINT "psychologistPathology_pkey" PRIMARY KEY (id);


--
-- Name: psychologistPathology psychologistPathology_psychologistId_pathologyId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistPathology"
    ADD CONSTRAINT "psychologistPathology_psychologistId_pathologyId_key" UNIQUE ("psychologistId", "pathologyId");


--
-- Name: psychologist psychologist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.psychologist
    ADD CONSTRAINT psychologist_pkey PRIMARY KEY (id);


--
-- Name: recoverPassword recoverPassword_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."recoverPassword"
    ADD CONSTRAINT "recoverPassword_pkey" PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: workHistory workHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."workHistory"
    ADD CONSTRAINT "workHistory_pkey" PRIMARY KEY (id);


--
-- Name: workModel workModel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."workModel"
    ADD CONSTRAINT "workModel_pkey" PRIMARY KEY (id);


--
-- Name: academicHistory academicHistory_psychologistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."academicHistory"
    ADD CONSTRAINT "academicHistory_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: appointmentReview appointmentReview_appointmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."appointmentReview"
    ADD CONSTRAINT "appointmentReview_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES public.appointment(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: appointmentSchedule appointmentSchedule_psychologistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."appointmentSchedule"
    ADD CONSTRAINT "appointmentSchedule_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: appointment appointment_appointmentScheduleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "appointment_appointmentScheduleId_fkey" FOREIGN KEY ("appointmentScheduleId") REFERENCES public."appointmentSchedule"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: appointment appointment_callPlatformId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "appointment_callPlatformId_fkey" FOREIGN KEY ("callPlatformId") REFERENCES public."callPlatform"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: appointment appointment_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "appointment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.parent(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: child child_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child
    ADD CONSTRAINT "child_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.parent(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: parent parent_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent
    ADD CONSTRAINT "parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: psychologistCallPlatform psychologistCallPlatform_callPlatformId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistCallPlatform"
    ADD CONSTRAINT "psychologistCallPlatform_callPlatformId_fkey" FOREIGN KEY ("callPlatformId") REFERENCES public."callPlatform"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: psychologistCallPlatform psychologistCallPlatform_psychologistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistCallPlatform"
    ADD CONSTRAINT "psychologistCallPlatform_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: psychologistLanguage psychologistLanguage_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistLanguage"
    ADD CONSTRAINT "psychologistLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public.languages(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: psychologistLanguage psychologistLanguage_psychologistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistLanguage"
    ADD CONSTRAINT "psychologistLanguage_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: psychologistPathology psychologistPathology_pathologyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistPathology"
    ADD CONSTRAINT "psychologistPathology_pathologyId_fkey" FOREIGN KEY ("pathologyId") REFERENCES public.pathology(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: psychologistPathology psychologistPathology_psychologistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."psychologistPathology"
    ADD CONSTRAINT "psychologistPathology_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: psychologist psychologist_genderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.psychologist
    ADD CONSTRAINT "psychologist_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES public.gender(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: psychologist psychologist_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.psychologist
    ADD CONSTRAINT "psychologist_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: psychologist psychologist_workModelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.psychologist
    ADD CONSTRAINT "psychologist_workModelId_fkey" FOREIGN KEY ("workModelId") REFERENCES public."workModel"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recoverPassword recoverPassword_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."recoverPassword"
    ADD CONSTRAINT "recoverPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user user_permissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "user_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public.permission(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workHistory workHistory_psychologistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."workHistory"
    ADD CONSTRAINT "workHistory_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES public.psychologist(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           