import { PrismaClient } from '../../generated/prisma/index.js';
const prisma = new PrismaClient();

// 상품에 댓글 등록
export const createProductComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { productId } = req.params;

    const comment = await prisma.comment.create({
      data: {
        content,
        product: { connect: { id: parseInt(productId) } },
      },
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

// 게시글에 댓글 등록
export const createArticleComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { articleId } = req.params;

    const comment = await prisma.comment.create({
      data: {
        content,
        article: { connect: { id: parseInt(articleId) } },
      },
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

// 상품 댓글 목록 조회
export const getProductComments = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { cursor, take = 10 } = req.query;

    const comments = await prisma.comment.findMany({
      where: { productId: parseInt(productId) },
      take: parseInt(take),
      ...(cursor && { skip: 1, cursor: { id: parseInt(cursor) } }),
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

// 게시글 댓글 목록 조회
export const getArticleComments = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { cursor, take = 10 } = req.query;

    const comments = await prisma.comment.findMany({
      where: { articleId: parseInt(articleId) },
      take: parseInt(take),
      ...(cursor && { skip: 1, cursor: { id: parseInt(cursor) } }),
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

// 댓글 수정
export const updateComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { commentId } = req.params;

    const updated = await prisma.comment.update({
      where: { id: parseInt(commentId) },
      data: { content },
    });

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// 댓글 삭제
export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    await prisma.comment.delete({
      where: { id: parseInt(commentId) },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
