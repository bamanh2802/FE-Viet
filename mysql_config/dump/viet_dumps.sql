CREATE DATABASE  IF NOT EXISTS `viet_database` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `viet_database`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: viet_database
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bot_messages`
--

DROP TABLE IF EXISTS `bot_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bot_messages` (
  `bot_msg_id` varchar(45) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `conversation_id` varchar(45) NOT NULL,
  `user_msg_id` varchar(45) NOT NULL,
  PRIMARY KEY (`bot_msg_id`,`user_msg_id`),
  UNIQUE KEY `bot_msg_id_UNIQUE` (`bot_msg_id`),
  KEY `fk_bot_messages_conversations1_idx` (`conversation_id`),
  KEY `fk_bot_messages_user_messages1_idx` (`user_msg_id`),
  CONSTRAINT `fk_bot_messages_conversations1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`conversation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bot_messages_user_messages1` FOREIGN KEY (`user_msg_id`) REFERENCES `user_messages` (`user_msg_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bot_messages`
--

LOCK TABLES `bot_messages` WRITE;
/*!40000 ALTER TABLE `bot_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `bot_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bot_messages_has_chunks`
--

DROP TABLE IF EXISTS `bot_messages_has_chunks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bot_messages_has_chunks` (
  `bot_msg_id` varchar(45) NOT NULL,
  `chunk_id` varchar(45) NOT NULL,
  PRIMARY KEY (`bot_msg_id`,`chunk_id`),
  KEY `fk_bot_messages_has_chunks_chunks1_idx` (`chunk_id`),
  KEY `fk_bot_messages_has_chunks_bot_messages1_idx` (`bot_msg_id`),
  CONSTRAINT `fk_bot_messages_has_chunks_bot_messages1` FOREIGN KEY (`bot_msg_id`) REFERENCES `bot_messages` (`bot_msg_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bot_messages_has_chunks_chunks1` FOREIGN KEY (`chunk_id`) REFERENCES `chunks` (`chunk_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bot_messages_has_chunks`
--

LOCK TABLES `bot_messages_has_chunks` WRITE;
/*!40000 ALTER TABLE `bot_messages_has_chunks` DISABLE KEYS */;
/*!40000 ALTER TABLE `bot_messages_has_chunks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chunks`
--

DROP TABLE IF EXISTS `chunks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chunks` (
  `chunk_id` varchar(45) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_in_ref` int NOT NULL,
  `document_id` varchar(45) NOT NULL,
  PRIMARY KEY (`chunk_id`),
  UNIQUE KEY `chunk_id_UNIQUE` (`chunk_id`),
  KEY `fk_chunks_documents1_idx` (`document_id`),
  CONSTRAINT `fk_chunks_documents1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chunks`
--

LOCK TABLES `chunks` WRITE;
/*!40000 ALTER TABLE `chunks` DISABLE KEYS */;
INSERT INTO `chunks` VALUES ('chunk-028fb089-93ec-4a2f-b516-3d772106b696','this. Wang et al. (2019) identify 100 words to be\r\nthe optimal size for candidate passages, which then\r\nbecame the de facto length. Many works explored\r\nretrieval at varied granularity, including paragraph\r\n(Lee et al., 2019; Feldman and El-Yaniv, 2019),\r\nphrase (Lee et al., 2021), and even token levels\r\n(Khandelwal et al., 2020; Alon et al., 2022), which\r\nall reveal a trade-off in difficulty between retrieval\r\nand generation: retrieving longer sequences is easier, but it is harder to generate correct output from\r\nthem. In fact, Shi et al. (2023) shows that model\r\nperformance can dramatically decrease when irrelevant information is included in output-supporting\r\ndocuments. Our method alleviates this in-passage\r\ndistraction, by allowing arbitrary passage sizes at\r\nretrieval time, and providing precisely useful content for generation.\r\nOptimizing Retrieval for Augmentation Many\r\nworks focus on post-process retrieved content to\r\naugment the generation. A common approach is','2024-08-20 04:39:29','2024-08-20 04:39:29',47,''),('chunk-02e932b1-0dba-4616-b802-2ca6283a02f0','further, our filtering can apply to text split in arbitrary granularity that optimizes the task of interest,\r\nand capture more subtle variances in context.\r\n8 Conclusion and Future Work\r\nWe propose a context filtering method, FILCO, to\r\nprovide precisely supportive content to assist model\r\ngenerations, which effectively removes distracting\r\ncontent in both passages partially supporting and irrelevant to the queries. Applying our method brings\r\nan average of 2.8 and 3.0 point increase with FLANT5 and LLAMA2, across six knowledge-intensive\r\nlanguage datasets from question answering, fact\r\nverification, to knowledge-grounded dialog generation. Our work also reveals varied recipes to\r\neffectively filter context for different tasks. We\r\nhope that FILCO can facilitate more developments\r\ntoward faithful generations in more scenarios.\r\nLimitations\r\nOur proposed method has been shown effective\r\nacross various tasks, however, may be in certain','2024-08-20 04:39:29','2024-08-20 04:39:29',49,''),('chunk-08e8d379-3795-4f95-ac74-a1211f670208','More specifically, we do not filter context in the\r\nFULL setting, filter context by passage in the PSG\r\nsetting, and filter context in the sentence level with\r\nFILCO. Model inputs contain the original query\r\nand (filtered) context.7 Our method (the FILCO column) effectively reduces input length by 44 − 64%.\r\nHigher Precision To evaluate the amount of potentially redundant information in the context, we\r\nmeasure the unigram precision of outputs with respect to filtered or unfiltered contexts.\r\n7We tokenize all text sequences with the LlamaTokenizer.\r\nAs shown in Table 3, context after filtering\r\nachieves much higher precision for all tasks. Particularly for abstractive tasks, SILVER filtering increases the precision by +14.5 on HotpotQA and\r\n+60.7 on WoW. Moreover, model-filtered contexts\r\n(FILCO) are largely comparable to SILVER, and\r\nsometimes even better, such as +3.8 points in TQA.','2024-08-20 04:39:29','2024-08-20 04:39:29',36,''),('chunk-14614d8a-f63f-4d7d-b9da-0f3f572a5b7c','context tpred for inference.\r\nFor each training example (q, o), we prepend the\r\nsilver filtered context tsilver to the example query\r\nq, and obtain the model input q ⊕ tsilver. We feed\r\nthis input into the generation model Mgen and train\r\nit to output the canonical response o, formalized as\r\nMgen(o ∣ tsilver ⊕ q).\r\nAt inference time, we provide the context tpred\r\nfiltered by model Mctx for generation, denoted as\r\nMgen(o ∣ tpred ⊕ q) = Mgen(o ∣ Mctx(q, P) ⊕ q).\r\nIn comparison to appending all retrieved text\r\nspans P ⊕ q, including only selected text can effectively reduce the computational cost by ∣P∣\r\n∣t∣\r\nat both\r\ntraining and inference time.\r\n3 Knowledge-Intensive Language Tasks\r\nWe experiment on six knowledge-intensive language tasks that necessitate retrieval augmentation\r\nfor generation (§3.1), where a limited portion of examples are supported by retrieved passages (§3.2).\r\n3.1 Tasks and Datasets\r\nWe use six datasets built from Wikipedia articles','2024-08-20 04:39:29','2024-08-20 04:39:29',18,''),('chunk-19d1c3cc-4342-4ff8-93a1-aeb15632c87e','possibly suffer from distracting content, even in\r\npositive passages.\r\nIn this paper, we propose FILCO (§2), a method\r\nthat learns to FILter COntext retrieved in a finegrained sentence-wise manner, by training on content selected via three measures: (i) STRINC:\r\nwhether passages contain the generation output,\r\n(ii) LEXICAL overlap: how much unigram overlap\r\nthe content and output has, and (iii) Conditional\r\ncross-mutual information (CXMI): how much more\r\nlikely the generator is to generate the output when\r\nthe content is provided.\r\nWe experiment on six knowledge-intensive language datasets from three tasks (§3). (1) question\r\nanswering: including NaturalQuestions (NQ) and\r\nTrivia QA (TQA), as well as more complex multihop HotpotQA and long-form ELI5, (2) fact verification: Fact Extraction and VERificaton (FEVER),\r\nand (3) knowledge-grounded dialog generation:\r\nWizard of Wikipedia (WoW).\r\nUsing FLAN-T5 and LLAMA2 models, our\r\nmethod outperforms both baseline methods, i.e.,','2024-08-20 04:39:29','2024-08-20 04:39:29',8,''),('chunk-21dace17-599c-4737-8af3-e90880c77917','et al., 2017), biomedical knowledge (Nentidis et al.,\r\n2023), and even fictional stories (Kociský et al. ˇ ,\r\n2018; Xu et al., 2022), can readily adopt our\r\nmethod and potentially benefit from it. Nonetheless, we encourage readers to verify its effectiveness before directly extrapolating our conclusion\r\nto special-domain datasets.\r\nWe evaluate model retrieval, filtering, and generation performance using automatic metrics such as\r\nExact Match and Unigram F1, which have become\r\nthe standard metrics. Beyond lexical-based metrics,\r\nwe keep open to neural- or human-based evaluations, given the potentially inaccurate automatic\r\nmeasures, especially with increasingly complex\r\ntasks (Pugaliya et al., 2019) and models of greater\r\ncapacities (Kamalloo et al., 2023).\r\nOur method requires training models to (i) filter\r\ncontext, and (ii) generate output, which necessitates\r\ncertain computational resources, according to the\r\nmodel architecture and size of choice. Nonetheless,','2024-08-20 04:39:29','2024-08-20 04:39:29',51,''),('chunk-2512a3e0-74fc-4f70-8bf6-8ee19da20df0','of our method, we denote this approach as PSG and\r\nadopt it as another baseline.\r\nMain Approach: Augmenting with Filtered Context As described in §2, we train Mctx to filter the\r\ntop-1 retrieved passage P to tsilver, and Mgen to\r\ngenerate output o with tsilver. To create tsilver, we\r\nuse the STRINC measure for NQ and TQA, LEXICAL for FEVER, and CXMI for WoW, HotpotQA,\r\nand ELI5. These measures are shown to be the\r\noptimal settings based on further analysis in §5.\r\nAt test time, we provide model-filtered context\r\ntpred to Mgen, and denote the results as FILCO.\r\nTo demonstrate the prospective performance upperbound, we also evaluate Mgen generation by providing silver-filtered context tsilver, and denote\r\nthese results as SILVER.\r\n4.3 Generation Performance\r\nResults using four methods and two models are\r\nshown in Figure 4. In general, applying context\r\nfiltering beforehand significantly improves the results on all datasets than FULL. Moreover, filtering','2024-08-20 04:39:29','2024-08-20 04:39:29',31,''),('chunk-27679949-d05a-4266-a120-8e07d6011816','but also achieve good performance on many other\r\ntasks. We train the 7B model version with LoRA\r\n(Hu et al., 2022) using the xTuring platform.6\r\nImplementation Details For both models, we\r\nallow a maximum length of 1024 tokens for all\r\nsequences at training and inference. Mctx is configured to generate at most 512 tokens as filtered\r\ncontext for all tasks. We allow Mgen to generate\r\nat most 128 tokens for extractive QA, fact verification, and dialog generation tasks. We use greedy\r\ndecoding for generating both filtered context and\r\nend-generation output. Unless otherwise specified,\r\nwe train all Mctx and Mgen models for 3 epochs,\r\nusing a learning rate of 5e−5 and batch size of 32.\r\n4.2 Experiment Methods\r\nWe describe two baselines FULL and PSG, our main\r\napproach FILCO, and the SILVER setting.\r\nBaseline 1: Augmenting with Full Passages The most common approach for retrievalaugmented generation is to concatenate all passages into the input. We denote this method as','2024-08-20 04:39:29','2024-08-20 04:39:29',28,''),('chunk-303f98d9-ac4e-4b37-b666-4f5fb5028b2c','Thomas Wolf, Lysandre Debut, Victor Sanh, Julien\r\nChaumond, Clement Delangue, Anthony Moi, Pierric Cistac, Tim Rault, Remi Louf, Morgan Funtowicz, Joe Davison, Sam Shleifer, Patrick von Platen,\r\nClara Ma, Yacine Jernite, Julien Plu, Canwen Xu,\r\nTeven Le Scao, Sylvain Gugger, Mariama Drame,\r\nQuentin Lhoest, and Alexander Rush. 2020. Transformers: State-of-the-art natural language processing.\r\nIn Proceedings of the 2020 Conference on Empirical\r\nMethods in Natural Language Processing: System\r\nDemonstrations, pages 38–45, Online. Association\r\nfor Computational Linguistics.\r\nYing Xu, Dakuo Wang, Mo Yu, Daniel Ritchie, Bingsheng Yao, Tongshuang Wu, Zheng Zhang, Toby\r\nLi, Nora Bradford, Branda Sun, Tran Hoang, Yisi\r\nSang, Yufang Hou, Xiaojuan Ma, Diyi Yang, Nanyun\r\nPeng, Zhou Yu, and Mark Warschauer. 2022. Fantastic questions and where to find them: FairytaleQA\r\n– an authentic dataset for narrative comprehension.\r\nIn Proceedings of the 60th Annual Meeting of the','2024-08-20 04:39:29','2024-08-20 04:39:29',68,''),('chunk-37c790a3-ae39-4d0e-a7dd-aa4f0ebccc6b','Lewis, Majid Yazdani, Nicola De Cao, James Thorne,\r\nYacine Jernite, Vladimir Karpukhin, Jean Maillard,\r\nVassilis Plachouras, Tim Rocktäschel, and Sebastian\r\nRiedel. 2021. KILT: a benchmark for knowledge\r\nintensive language tasks. In Proceedings of the 2021\r\nConference of the North American Chapter of the\r\nAssociation for Computational Linguistics: Human\r\nLanguage Technologies, pages 2523–2544, Online.\r\nAssociation for Computational Linguistics.','2024-08-20 04:39:29','2024-08-20 04:39:29',64,''),('chunk-390fd2f5-47b8-4026-9182-3c83c1da86e5','Association for Computational Linguistics.\r\nPatrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio\r\nPetroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, and Douwe Kiela. 2020.\r\nRetrieval-Augmented Generation for knowledgeintensive NLP tasks. In Advances in Neural Information Processing Systems, volume 33, pages 9459–\r\n9474.\r\nAlex Mallen, Akari Asai, Victor Zhong, Rajarshi Das,\r\nDaniel Khashabi, and Hannaneh Hajishirzi. 2023.\r\nWhen not to trust language models: Investigating\r\neffectiveness of parametric and non-parametric memories. arXiv preprint arXiv:2212.10511.\r\nYuning Mao, Pengcheng He, Xiaodong Liu, Yelong\r\nShen, Jianfeng Gao, Jiawei Han, and Weizhu Chen.\r\n2021. Reader-guided passage reranking for opendomain question answering. In Findings of the Association for Computational Linguistics: ACL-IJCNLP\r\n2021, pages 344–350, Online. Association for Computational Linguistics.','2024-08-20 04:39:29','2024-08-20 04:39:29',62,''),('chunk-3bdb3c92-ec2c-477e-814b-43981e0ce048','2021, pages 344–350, Online. Association for Computational Linguistics.\r\nGrégoire Mialon, Roberto Dessì, Maria Lomeli, Christoforos Nalmpantis, Ram Pasunuru, Roberta Raileanu,\r\nBaptiste Rozière, Timo Schick, Jane Dwivedi-Yu,\r\nAsli Celikyilmaz, Edouard Grave, Yann LeCun, and\r\nThomas Scialom. 2023. Augmented language models: a survey. arXiv preprint arXiv:2302.07842.\r\nAnastasios Nentidis, Anastasia Krithara, Georgios\r\nPaliouras, Eulàlia Farré-Maduell, Salvador LimaLópez, and Martin Krallinger. 2023. Bioasq\r\nat clef2023: The eleventh edition of the large-scale\r\nbiomedical semantic indexing and question answering challenge. In Advances in Information Retrieval.\r\nRodrigo Nogueira and Kyunghyun Cho. 2020. Passage re-ranking with bert. arXiv preprint\r\narXiv:1901.04085.\r\nFabio Petroni, Aleksandra Piktus, Angela Fan, Patrick\r\nLewis, Majid Yazdani, Nicola De Cao, James Thorne,\r\nYacine Jernite, Vladimir Karpukhin, Jean Maillard,\r\nVassilis Plachouras, Tim Rocktäschel, and Sebastian','2024-08-20 04:39:29','2024-08-20 04:39:29',63,''),('chunk-3dcf86d7-e6b1-4dbd-a135-fc7de76dc5a9','from the irrelevant passage, which would inevitably\r\nbe incorrect. This potentially degrades accuracy, as\r\ntraining with higher-quality context often leads to\r\nbetter performance (Dou et al., 2021).\r\nSome works have attempted to optimize the provided content on the passage level, by reranking\r\nmore relevant passages rise to the top of the retrieved list (Wang et al., 2018; Nogueira and Cho,\r\n2020; Mao et al., 2021), selecting only evidential\r\npassages to include (Asai et al., 2022), or only retrieving passages when generation models need\r\nassistance (Mallen et al., 2023; Jiang et al., 2023).\r\nChoi et al. (2021) proposed to decontextualize senarXiv:2311.08377v1 [cs.CL] 14 Nov 2023','2024-08-20 04:39:29','2024-08-20 04:39:29',6,''),('chunk-3f672fc9-1406-4c66-9db2-31a996d58ba2','context, and (ii) generate output, which necessitates\r\ncertain computational resources, according to the\r\nmodel architecture and size of choice. Nonetheless,\r\nour method costs less computation compared to\r\ntraditional full-passage augmentation. As shown\r\nby §5, a generation model with filtered content\r\nrequires at least 4.7 times less computation, at both\r\ntraining and inference time.\r\nAcknowledgements\r\nThis work was supported in part by a grant from\r\nBosch. We thank the members of CMU LTI for\r\ntheir helpful discussion and feedback on this work.\r\nReferences\r\nUri Alon, Frank F. Xu, Junxian He, Sudipta Sengupta, Dan Roth, and Graham Neubig. 2022.\r\nNeuro-symbolic language modeling with automatonaugmented retrieval. In ICML 2022 Workshop on\r\nKnowledge Retrieval and Language Models.\r\nAkari Asai, Matt Gardner, and Hannaneh Hajishirzi. 2022. Evidentiality-guided generation for\r\nknowledge-intensive NLP tasks. In Proceedings of','2024-08-20 04:39:29','2024-08-20 04:39:29',52,''),('chunk-41229b4d-567b-410b-9b07-ff5691039614','Learning Representations.\r\nGautier Izacard and Edouard Grave. 2021. Leveraging\r\npassage retrieval with generative models for open domain question answering. In Proceedings of the 16th\r\nConference of the European Chapter of the Association for Computational Linguistics: Main Volume,','2024-08-20 04:39:29','2024-08-20 04:39:29',57,''),('chunk-4515ae46-5e82-44d3-af53-d88356ebe10a','1835. The earliest railway in Britain was a wagonway \r\nsystem, a horse drawn wooden rail system, used by \r\nGerman miners at Caldbeck, Cumbria, England, perhaps \r\nfrom the 1560s. A wagonway was built at Prescot, near \r\nLiverpool, sometime around 1600, possibly as early as \r\n1594. Owned by Philip Layton, the line carried coal from \r\na pit near Prescot Hall to a terminus about half a mile \r\naway. On 26 July 1803, Jessop opened the Surrey Iron\r\n Retrieved Passage\r\nQuestion\r\nWhen did the \r\nfirst train run \r\nin England?\r\n1835\r\n1560s\r\nThe earliest railway in Britain was a wagonway system, a \r\nhorse drawn wooden rail system, used by German miners \r\nat Caldbeck, Cumbria, England, perhaps from the 1560s. \r\n Distilled Content\r\nFigure 1: FILCO filters out irrelevant content (marked\r\nin red) and leaves precisely supporting content, making\r\nit easier for the generator to predict the correct answer.\r\nIdeally, a model should be grounded on the precisely supporting content to generate the correct','2024-08-20 04:39:29','2024-08-20 04:39:29',4,''),('chunk-48ec12c0-8fda-4731-9a9f-004adeb7719d','(EM) metric to evaluate model predictions.\r\nMulti-Hop Question Answering We also adopt\r\nmore complex QA scenarios, the first of which is\r\nmulti-hop QA, where each question q requires reasoning over a chain of passages P to obtain the\r\ncorrect answer o. For this task, we use the HotpotQA (Yang et al., 2018) dataset containing 113K\r\nquestion-answer pairs created based on Wikipedia\r\npages. Because the answers o do not always appear\r\nin the ground-truth supporting documents P, this\r\ndataset belongs to abstractive generation, in contrast to the extractive nature of answers in NQ and\r\nTQA. Following Yang et al. (2018) and accommodating its abstractive nature, we use unigram F1 to\r\nevaluate answer correctness.\r\nLong-Form Question Answering Another complex QA task is generating long, abstract answers\r\ngiven the question, i.e., long-form QA. For this\r\nwe use the ELI5 (Fan et al., 2019) dataset, which','2024-08-20 04:39:29','2024-08-20 04:39:29',20,''),('chunk-49421b0f-87c6-4988-a3d1-e4ce234472f8','fact in the Wikipedia reference, otherwise is labeled\r\nas “REFUTES” due to the fact contradiction. Following the original baseline (Thorne et al., 2018),\r\nwe use accuracy for evaluation.\r\nKnowledge-Grounded Dialog Generation We\r\nadopt the Wizard of Wikipedia (WoW) dataset (Dinan et al., 2019) from KILT, which aims to generate\r\nthe next dialog by grounding on Wikipedia articles.\r\nIn each example, the input q is the conversation\r\nhistory involving multiple utterance turns, and the\r\nnext-turn response is the output o. We evaluate\r\nwith unigram F1 following Petroni et al. (2021).\r\nDataset # Examples (thousands) Evaluation\r\ntrain dev test Metric\r\nNQ 79.2 8.7 3.6 EM\r\nTQA 78.8 8.8 11.3 EM\r\nHOTPOTQA 88.9 5.6 5.6 F1\r\nELI5 273.0 1.5 0.6 F1\r\nFEVER 105.0 10.4 10.1 Accuracy\r\nWOW 63.7 3.1 2.9 F1\r\nTable 1: Statistics and evaluation metric for six tasks.\r\nTable 1 lists the dataset statistics. Because test\r\nsets are not available for datasets adopted from the','2024-08-20 04:39:29','2024-08-20 04:39:29',22,''),('chunk-4cf6e4e8-d00e-4ac2-b0f9-629d1934773d','exceptionally high top-1 precision, because its output often aggregates large text chunks from multiple passages. However, precision drops by over\r\n40 points when adding 4 more passages. These\r\nnumbers indicate the potential existence of redundant content, which could distract the model and\r\ndeteriorate the final generation.\r\nIn the next section, we attempt to filter the sufficient and precisely necessary context, as described\r\nin §2, to achieve more efficient generation.\r\n5\r\nhttps://github.com/facebookresearch/DPR#\r\nnew-march-2021-retrieval-model\r\n4 Experiments and Analysis\r\nWe first introduce the experimental setup (§4.1) and\r\nbaseline approaches for comparison (§4.2). Then,\r\nwe evaluate model performance on both end generation (§4.3) and context filtering (§4.5).\r\n4.1 Experimental Setup\r\nWe use FLAN-T5 (Chung et al., 2022) and LLAMA\r\n2 (Touvron et al., 2023) as the backbone model\r\narchitectures, because of their potential superior','2024-08-20 04:39:29','2024-08-20 04:39:29',26,''),('chunk-540b4881-77ca-4edd-add1-8dc1e64dfc8b','multi-hop QA, long-form QA, and fact verification.\r\nTaking the fact verification task for example,\r\nwhile factually incorrect claims (labeled as REFUTES) often contain entity spans from irrelevant\r\nor distracting content in the passage, such as “2000\r\nBC” in Figure 7, lexical measures would falsely\r\npick the misleading content that matches “2000\r\n8\r\nContext that accidentally contains the answer string but\r\ndoes not actually answer the question.\r\n The horse began to become domesticated around 2000 BC.\r\n o REFUTES\r\nq\r\n Domestication of the horse A number of hypotheses exist \r\non many of the key issues regarding the domestication of the \r\nhorse. Although horses appeared in Paleolithic cave art as early \r\nas 30,000 BCE, these were wild horses and were probably \r\nhunted for meat. How and when horses became domesticated \r\nis disputed. The clearest evidence of early use of the horse as a','2024-08-20 04:39:29','2024-08-20 04:39:29',41,''),('chunk-5bdd92ef-f7d0-4da6-a852-9ec00b73158e','Representations.\r\nTomáš Kociský, Jonathan Schwarz, Phil Blunsom, Chris ˇ\r\nDyer, Karl Moritz Hermann, Gábor Melis, and Edward Grefenstette. 2018. The NarrativeQA reading\r\ncomprehension challenge. Transactions of the Association for Computational Linguistics, 6:317–328.\r\nMojtaba Komeili, Kurt Shuster, and Jason Weston. 2022.\r\nInternet-augmented dialogue generation. In Proceedings of the 60th Annual Meeting of the Association\r\nfor Computational Linguistics (Volume 1: Long Papers), pages 8460–8478, Dublin, Ireland. Association\r\nfor Computational Linguistics.\r\nTom Kwiatkowski, Jennimaria Palomaki, Olivia Redfield, Michael Collins, Ankur Parikh, Chris Alberti,\r\nDanielle Epstein, Illia Polosukhin, Jacob Devlin, Kenton Lee, Kristina Toutanova, Llion Jones, Matthew\r\nKelcey, Ming-Wei Chang, Andrew M. Dai, Jakob\r\nUszkoreit, Quoc Le, and Slav Petrov. 2019. Natural questions: A benchmark for question answering','2024-08-20 04:39:29','2024-08-20 04:39:29',60,''),('chunk-5ccded99-3c37-48c6-b685-db7e43993b22','– an authentic dataset for narrative comprehension.\r\nIn Proceedings of the 60th Annual Meeting of the\r\nAssociation for Computational Linguistics (Volume\r\n1: Long Papers), pages 447–460, Dublin, Ireland.\r\nAssociation for Computational Linguistics.\r\nZhilin Yang, Peng Qi, Saizheng Zhang, Yoshua Bengio,\r\nWilliam Cohen, Ruslan Salakhutdinov, and Christopher D. Manning. 2018. HotpotQA: A dataset for\r\ndiverse, explainable multi-hop question answering.\r\nIn Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing, pages\r\n2369–2380, Brussels, Belgium. Association for Computational Linguistics.\r\nLei Yu, Karl Moritz Hermann, Phil Blunsom, and\r\nStephen Pulman. 2014. Deep learning for answer\r\nsentence selection. arXiv preprint arXiv:1412.1632.','2024-08-20 04:39:29','2024-08-20 04:39:29',69,''),('chunk-6372d9b2-ba2b-4b5c-bf06-3bfb8befa46c','the generation performance. In comparison, selecting only the content supportive of making factual\r\njudgment can provide the correct knowledge that\r\nhorses became domesticated around “3500 BC”.\r\n6 Generation with Multiple Passages\r\nIt is often helpful to integrate multiple passages as\r\ncontext input to the model. Particularly, some tasks\r\nsuch as multi-hop QA may naturally necessitate\r\nusing multiple passages to perform the task. To\r\ndemonstrate the generality of our proposed method,\r\nwe further experiment using multiple passages as\r\nsource context. We experiment with FLAN-T5\r\nsince it has more consistent behaviors across tasks.\r\n6.1 Baseline and Settings\r\nWe experiment with top-K passages, where K = 5,\r\nto minimize the loss from length truncation due\r\nto model input limitations, compared to larger Ks,\r\nand hence produce more fair comparisons.\r\nSimilarly to the single-passage setting, we compare FULL and PSG as baseline methods, where','2024-08-20 04:39:29','2024-08-20 04:39:29',43,''),('chunk-650638cb-ae24-4e67-a827-4181302efdaf','Suleman. 2017. NewsQA: A machine comprehension dataset. In Proceedings of the 2nd Workshop\r\non Representation Learning for NLP, pages 191–200,\r\nVancouver, Canada. Association for Computational\r\nLinguistics.\r\nShuohang Wang, Mo Yu, Xiaoxiao Guo, Zhiguo\r\nWang, Tim Klinger, Wei Zhang, Shiyu Chang, Gerry\r\nTesauro, Bowen Zhou, and Jing Jiang. 2018. R3:\r\nReinforced ranker-reader for open-domain question\r\nanswering. In Proceedings of the AAAI Conference\r\non Artificial Intelligence, volume 32.\r\nZhiguo Wang, Patrick Ng, Xiaofei Ma, Ramesh Nallapati, and Bing Xiang. 2019. Multi-passage BERT: A\r\nglobally normalized BERT model for open-domain\r\nquestion answering. In Proceedings of the 2019 Conference on Empirical Methods in Natural Language\r\nProcessing and the 9th International Joint Conference on Natural Language Processing (EMNLPIJCNLP), pages 5878–5882, Hong Kong, China. Association for Computational Linguistics.\r\nThomas Wolf, Lysandre Debut, Victor Sanh, Julien','2024-08-20 04:39:29','2024-08-20 04:39:29',67,''),('chunk-6995e91d-09ca-4a63-973d-917b1bb4bab9','pos neg\r\nFull Psg FilCo (ours) Silver pos neg\r\npos neg\r\nELI5\r\npos neg\r\nFEVER\r\npos neg\r\nNQ TQA HotpotQA\r\nWoW\r\npos neg\r\nFigure 5: Improvement on examples retrieved with positive (top) and negative passages (bottom), respectively.\r\ning with our hypothesis, the generation model produces more correct outputs when we remove (i)\r\ndistracting content in positive passages, and (ii)\r\nnegative passages.\r\n4.5 Evaluating Filtered Contexts\r\nWe evaluate context filtering outputs from two aspects: reduced input length and increased answer\r\nprecision.\r\nFull Psg FilCo\r\nFigure 6: Number of input tokens after filtering retrieved\r\ncontexts with different strategies.\r\nShorter Inputs In Figure 6, we measure the average number of tokens in model inputs after filtering the retrieved contexts using different methods.\r\nMore specifically, we do not filter context in the\r\nFULL setting, filter context by passage in the PSG\r\nsetting, and filter context in the sentence level with','2024-08-20 04:39:29','2024-08-20 04:39:29',35,''),('chunk-77515cf0-fa56-4ebc-b841-18a838542006','it to generate filtered context tsilver, formalized as\r\nMctx(tsilver∣ q ⊕ P).\r\nAt test time, given the retrieved passages P\r\nfor each test query q, we leverage Mctx to predict filtered context tpred, formalized as tpred =\r\nMctx(q⊕P). tpred is subsequently provided to the\r\ngeneration model Mgen together with the query q,\r\nto predict the output.\r\n2.4 Generation With Filtered Contexts\r\nAs illustrated in Figure 2, we similarly use tsilver\r\nfiltered context for training and model predicted\r\n4\r\n1.0 naturally distinguishes context that adds to or reduces\r\noutput probability. We compare other values in preliminary\r\nstudies (0.5, 2.0), where 1.0 gives the best results.','2024-08-20 04:39:29','2024-08-20 04:39:29',17,''),('chunk-7b852080-a5c8-4f20-b2c2-c31b725b4b5e','shown in Figure 4. In general, applying context\r\nfiltering beforehand significantly improves the results on all datasets than FULL. Moreover, filtering\r\nin a finer granularity is better than PSG.\r\nCompared to providing Mgen with SILVER filtered contexts, using contents predicted by the filter\r\nmodel, i.e., FILCO achieves comparable performance on all six tasks, indicating effective training\r\nof the context filtering process.\r\nFor extractive QA tasks, our method achieves\r\n+4.3 and +8.6 EM increase in NQ with FLAN-T5\r\nand LLAMA2 models, +1.1 and +0.2 EM increase\r\nin TQA. As exemplified by Figure 1, our context\r\nfilter effectively removes distracting alternative answers and irrelevant passages, hence enabling the\r\ngeneration model to hit the correct answer span\r\nwith higher precision and lower effort.\r\nFor more complex QA tasks, our method brings\r\n+1.0 and +1.3 F1 increase in HotpotQA with\r\nFLAN-T5 and LLAMA2 models, and +0.6, +2.6\r\nEM increase in ELI5. The overall improvement is','2024-08-20 04:39:29','2024-08-20 04:39:29',32,''),('chunk-7db66261-e481-45d5-bec1-876906b1ebbb','along linearly (Izacard and Grave, 2021) or quadratically increased computation.\r\nDataset Recall (pos. + neg.) Precision (pos.)\r\n1 5 1 5\r\nNQ 50.1 74.1 2.5 2.7\r\nTQA 61.2 77.8 4.5 4.8\r\nHOTPOTQA 16.7 27.3 2.1 0.4\r\nELI5 13.1 25.7 97.7 55.1\r\nFEVER 57.0 75.9 1.3 1.4\r\nWOW 34.9 54.8 16.4 17.7\r\nTable 2: Recall of the top 1 and top 5 DPR-retrieved\r\npassages, and precision on positive passages.\r\nNoise in Positive Passagess To measure the ratio\r\nof precisely supporting context in retrieved passages, we further calculate their unigram precision\r\nwith regard to the annotated output, as shown in\r\nTable 2. In general, the precision is pretty low:\r\nscoring less than 20.0 for WoW, and less than 5.0\r\nfor NQ, TQA, HotpotQA, and FEVER. ELI5 has\r\nexceptionally high top-1 precision, because its output often aggregates large text chunks from multiple passages. However, precision drops by over\r\n40 points when adding 4 more passages. These','2024-08-20 04:39:29','2024-08-20 04:39:29',25,''),('chunk-866ee2b1-b003-4aac-9efc-46cd231e7b1a','text filter model, on datasets of different properties.\r\nResults in Table 4 reveal that different tasks benefit the most from different measures. NQ and TQA\r\nfavor STRINC, WoW works best with LEXICAL,\r\nwhile more complex tasks such as FEVER, HOTPOTQA, and ELI5 perform the best using CXMI.\r\nModel wise, FLAN-T5 and LLAMA2 align on most\r\ntasks, with slight divergence on ELI5.\r\nFLAN-T5\r\nMeasure STRINC LEXICAL CXMI\r\nNQ 44.7 30.0 39.9\r\nTQA 59.2 39.0 45.3\r\nHOTPOTQA 59.2 57.4 60.0\r\nELI5 73.6 73.9 74.2\r\nFEVER 80.9 86.4 95.8\r\nWOW 63.4 69.3 66.6\r\nLLAMA 2\r\nNQ 43.3 35.2 41.8\r\nTQA 60.7 57.1 60.7\r\nHOTPOTQA 59.5 61.1 61.3\r\nELI5 78.6 78.8 72.8\r\nFEVER 86.6 88.4 92.3\r\nWOW 65.5 66.0 65.4\r\nTable 4: FLAN-T5 and LLAMA2 using different context\r\nfiltering measures on each dataset.\r\n5.2 In-Depth Analysis for Different Tasks\r\nExtractive tasks (i.e., NQ and TQA) achieve the\r\nbest with an STRINC context filter. This phenomenon reasonably aligns with their extractive','2024-08-20 04:39:29','2024-08-20 04:39:29',39,''),('chunk-89b4c835-4a74-4d84-a73b-d1f2e0b9fa0f','+60.7 on WoW. Moreover, model-filtered contexts\r\n(FILCO) are largely comparable to SILVER, and\r\nsometimes even better, such as +3.8 points in TQA.\r\nFor other tasks, the small gaps between them minimally affect the end generation, as already shown\r\nin Figure 4. We conjecture these lost contents are\r\nnot essential for models, particularly if they only\r\ninvolve common entities (Mallen et al., 2023).\r\nHowever, filtering with the PSG baseline often\r\nleads to precisions lower than the FULL setting,\r\ndespite the fact that it has higher output scores than\r\nFULL. Coarse granularity for context filtering may\r\nbe one major reason for its loss in precision.\r\nMethod FULL PSG FILCO SILVER\r\nNQ 2.5 1.3 5.1 7.3\r\nTQA 4.5 3.0 8.4 4.6\r\nHOTPOTQA 2.6 2.6 10.8 17.1\r\nELI5 92.9 92.5 98.8 98.8\r\nFEVER 1.2 1.2 5.1 4.4\r\nWOW 10.8 35.5 62.9 71.5\r\nTable 3: Precision of canonical outputs with respect to\r\ncontexts filtered with different methods.\r\n5 Comparing Context Filtering Strategies','2024-08-20 04:39:29','2024-08-20 04:39:29',37,''),('chunk-8af93843-0881-41d2-9124-6eec6cdbddc3','pages 874–880, Online. Association for Computational Linguistics.\r\nZhengbao Jiang, Frank F. Xu, Luyu Gao, Zhiqing\r\nSun, Qian Liu, Jane Dwivedi-Yu, Yiming Yang,\r\nJamie Callan, and Graham Neubig. 2023. Active retrieval augmented generation. arXiv preprint\r\narXiv:2305.06983.\r\nMandar Joshi, Eunsol Choi, Daniel Weld, and Luke\r\nZettlemoyer. 2017. TriviaQA: A large scale distantly\r\nsupervised challenge dataset for reading comprehension. In Proceedings of the 55th Annual Meeting of\r\nthe Association for Computational Linguistics (Volume 1: Long Papers), pages 1601–1611, Vancouver,\r\nCanada. Association for Computational Linguistics.\r\nEhsan Kamalloo, Nouha Dziri, Charles LA Clarke, and\r\nDavood Rafiei. 2023. Evaluating open-domain question answering in the era of large language models.\r\narXiv preprint arXiv:2305.06984.\r\nVladimir Karpukhin, Barlas Oguz, Sewon Min, Patrick\r\nLewis, Ledell Wu, Sergey Edunov, Danqi Chen, and','2024-08-20 04:39:29','2024-08-20 04:39:29',58,''),('chunk-8b768acc-4a2b-4ce0-b1b9-e81f061ef669','for generation (§3.1), where a limited portion of examples are supported by retrieved passages (§3.2).\r\n3.1 Tasks and Datasets\r\nWe use six datasets built from Wikipedia articles\r\nas supporting documents for answer, response, and\r\njudgment generation, as listed in Table 1.\r\nOpen-Domain Question Answering We adopt\r\nNaturalQuestions (NQ) (Kwiatkowski et al., 2019)\r\nand TriviaQA (TQA) (Joshi et al., 2017) to experiment with the open-domain QA task.\r\nEach example in NQ has a question q and annotated short answers o. We experiment with the\r\nprocessed version (Lee et al., 2019) that includes\r\nall examples having short answers of no more than\r\nfive tokens. For the TQA dataset, each example\r\nhas a question q and answers o, which are extracted\r\nspans from supporting Wikipedia articles P. Following Lewis et al. (2020), we use the Exact Match\r\n(EM) metric to evaluate model predictions.\r\nMulti-Hop Question Answering We also adopt\r\nmore complex QA scenarios, the first of which is','2024-08-20 04:39:29','2024-08-20 04:39:29',19,''),('chunk-8d548054-74b5-4793-9634-14d2636dcbd2','the unigram overlap between the example e and the\r\ncandidate text span t. Intuitively speaking, higher\r\nlexical overlap indicates greater topic similarity,\r\nhence higher utility at generation time.\r\nWe select sentences t using different parts of the\r\nexample e for tasks of different types. We measure\r\nthe F1 score fuf1(t, o) ∈ [0, 1] between t and output o for tasks having responses grounded on provided knowledge, i.e., QA and dialog generation.\r\nWe measure t using query q for fact verification as\r\nfuf1(t, q) since o is a one-word binary label. We\r\nselect the sentence t\r\nj\r\ni with the highest similarity\r\nto example e and above a pre-defined threshold\r\nλ = 0.5,\r\n3 where (i, j) = arg maxi,j(fuf1(t\r\nj\r\ni\r\n, e)),\r\nand i, j ∈ {i, j ∣ fuf1(t\r\nj\r\ni\r\n, e) > λ}. Nonetheless,\r\nfor tasks having queries that may be factually incorrect (e.g., fact verification), spans of high lexical\r\noverlap to an erroneous claim may reinforce the\r\nmisinformation and lead to incorrect generations.','2024-08-20 04:39:29','2024-08-20 04:39:29',13,''),('chunk-9596f8f3-5dd0-4f25-a285-38ab3f1762a8','Baseline 1: Augmenting with Full Passages The most common approach for retrievalaugmented generation is to concatenate all passages into the input. We denote this method as\r\nFULL and adopt it as our first baseline. To conduct a fair comparison with sufficient training for\r\n6\r\nhttps://github.com/stochasticai/xTuring','2024-08-20 04:39:29','2024-08-20 04:39:29',29,''),('chunk-96016891-f334-4d91-9c4e-1837e7e8f0b2','to model input limitations, compared to larger Ks,\r\nand hence produce more fair comparisons.\r\nSimilarly to the single-passage setting, we compare FULL and PSG as baseline methods, where\r\nFULL inputs all passages unfiltered and PSG picks\r\nzero or more passages. We also include the results\r\nof top-performing methods such as RAG (Lewis\r\net al., 2020), FiD (Izacard and Grave, 2021), and\r\nevidentiality-guided (EVI.) generation (Asai et al.,\r\n2022). In comparison to baselines, we report the\r\nsentence-wise filtering method as FILCO and the\r\ncanonical setting by SILVER.','2024-08-20 04:39:29','2024-08-20 04:39:29',44,''),('chunk-99e21b9f-2fc4-4859-849b-a7809ab0f6d1','5.2 In-Depth Analysis for Different Tasks\r\nExtractive tasks (i.e., NQ and TQA) achieve the\r\nbest with an STRINC context filter. This phenomenon reasonably aligns with their extractive\r\nnature, where sentences that lexically entail the output answer usually are the ground truth supporting\r\ncontent, except for the case of spurious contexts.8\r\nOn the other hand, the STRINC strategy falls\r\nshort on abstractive tasks (i.e., FEVER and WoW),\r\ndue to the task feature that canonical output does\r\nnot exist in supporting documents, hence would\r\noften yield empty content for subsequent generation. An adapted LEXICAL measure F1 readily\r\nallows more flexible unigram-level matches and is\r\nthe most suitable approach for dialog generation.\r\nCXMI works the best for more complex tasks, i.e.,\r\nmulti-hop QA, long-form QA, and fact verification.\r\nTaking the fact verification task for example,\r\nwhile factually incorrect claims (labeled as REFUTES) often contain entity spans from irrelevant','2024-08-20 04:39:29','2024-08-20 04:39:29',40,''),('chunk-9da7c05e-4faf-416b-bbcf-6258c994662d','as 30,000 BCE, these were wild horses and were probably \r\nhunted for meat. How and when horses became domesticated \r\nis disputed. The clearest evidence of early use of the horse as a\r\nmeans of transport is from chariot burials dated c. 2000 BCE. However, an increasing amount of evidence supports the\r\nhypothesis that horses were domesticated in the Eurasian\r\nSteppes approximately 3500 BCE; recent discoveries in …\r\nP\r\nFigure 7: An example in the FEVER dataset illustrating\r\nfiltering outcomes using different strategies. STRINC\r\nyields empty context, LEXICAL and CXMI-filtered context are highlighted in red and green , respectively.\r\nBC” but concerns about “evidence of early use” instead of “become domesticated”. Augmenting with\r\nthis content can reinforce the spurious correlation\r\nvia the misleading fact (“2000 BC”) and deteriorate\r\nthe generation performance. In comparison, selecting only the content supportive of making factual\r\njudgment can provide the correct knowledge that','2024-08-20 04:39:29','2024-08-20 04:39:29',42,''),('chunk-a6823e35-f0ff-4b45-b5a7-f70111cca6f9','FEVER 1.2 1.2 5.1 4.4\r\nWOW 10.8 35.5 62.9 71.5\r\nTable 3: Precision of canonical outputs with respect to\r\ncontexts filtered with different methods.\r\n5 Comparing Context Filtering Strategies\r\nTo justify the selection of context filtering strategies\r\nin §4, we compare different measures to create filter\r\ntraining data, as introduced in §2.\r\n5.1 Results with Different Strategies\r\nWe compare using three methods in §2.2 —\r\nSTRINC, LEXICAL, and CXMI — to train the con-','2024-08-20 04:39:29','2024-08-20 04:39:29',38,''),('chunk-b04351c7-f098-4f07-a4f7-e458aa92a319','Generation Mgen\r\nContext Filter Mctx\r\nInput query q The horse began to \r\nbecome domesticated \r\naround 2000 BC.\r\nOutput o\r\nRetrieved Passage P\r\nThe clearest evidence of early use of the \r\nhorse as a means of transport is from \r\nchariot burials dated c. 2000 BCE. \r\nHowever, an increasing amount of\r\nevidence supports the hypothesis that\r\nhorses were domesticated in the Eurasian\r\nSteppes approximately 3500 BCE; recent ..\r\nStrInc\r\nLexical\r\nCXMI\r\nHowever, an increasing \r\namount of evidence supports \r\nthe hypothesis that horses \r\nwere domesticated in the \r\nEurasian Steppes \r\napproximately 3500 BCE\r\nFiltered Content t\r\nREFUTES REFUTES Prediction p\r\nFigure 2: The FILCO pipeline: (i) filtering retrieved passages, (ii) generation with filtered context.\r\ntences by integrating surrounding context, but require substantial human annotation effort and still\r\npossibly suffer from distracting content, even in\r\npositive passages.\r\nIn this paper, we propose FILCO (§2), a method','2024-08-20 04:39:29','2024-08-20 04:39:29',7,''),('chunk-b25d49d0-d992-4397-8775-b263ef43cb8d','NQ TQA HotpotQA\r\nELI5 FEVER WoW\r\nFull Psg FilCo (ours) Silver\r\nFigure 4: Generation performance when passages are filtered with different approaches.\r\ngeneration in a full-context style, we fine-tune the\r\nFLAN-T5 and LLAMA 2 models to generate outputs using the full content of the top-1 passages\r\nunder the same experiment setting as in §4.1.\r\nBaseline 2: Passage-Wise Filtering An alternative method inspired by Asai et al. (2022) is to\r\nfilter context on a passage level. Specifically, for\r\neach passage among the top-1 retrieved ones, the\r\nmodel decides whether to include the entire piece\r\nof the passage in the input. In comparison, our\r\nmethod operates in a finer granularity (i.e., on the\r\nsentence level) and could trained with multiple filtering strategies. To show the empirical advantage\r\nof our method, we denote this approach as PSG and\r\nadopt it as another baseline.\r\nMain Approach: Augmenting with Filtered Context As described in §2, we train Mctx to filter the','2024-08-20 04:39:29','2024-08-20 04:39:29',30,''),('chunk-b2dff71c-4bb3-4a70-8f25-be7cf06d2715','We now introduce three approaches to filtering\r\npotentially useful content from retrieved passages.\r\nString Inclusion The STRINC measure\r\nfinc(t, o) ∈ {0, 1} that makes a binary decision on\r\nwhether text span t lexically contains the output\r\no. We enumerate the ranked passages retrieved\r\n{p1, p2,⋯} and select the first text span that\r\ncontains the output finc(t, o) = 1. This measure\r\nis effective when the supporting document pgold\r\ncontains the exact output text o. However, finc\r\nmay fail to distinguish supporting context from\r\nspurious ones, that accidentally contain the output\r\nbut do not answer the question. Applying finc to\r\nother abstractive tasks may result in selecting zero\r\nspans since no exact matches exist.\r\nLexical Overlap We next introduce a more flexible LEXICAL measure fuf1 ∈ [0, 1] that calculates\r\nthe unigram overlap between the example e and the\r\ncandidate text span t. Intuitively speaking, higher\r\nlexical overlap indicates greater topic similarity,','2024-08-20 04:39:29','2024-08-20 04:39:29',12,''),('chunk-b3c9acc1-2eb8-445f-8fe4-f6cd1c1fb63c','improvements under both scenarios.\r\nAs shown in Figure 5, for both positive and negative passages retrieved, applying FILCO effectively\r\nimproves the context quality, hence yields better\r\nend generation results, particularly for abstractive\r\ngeneration tasks such as FEVER and WoW. Align-','2024-08-20 04:39:29','2024-08-20 04:39:29',34,''),('chunk-b7035e35-e393-4db9-8202-294e262105b1','Mirac Suzgun, Xinyun Chen, Aakanksha Chowdhery, Alex Castro-Ros, Marie Pellat, Kevin Robinson,\r\nDasha Valter, Sharan Narang, Gaurav Mishra, Adams\r\nYu, Vincent Zhao, Yanping Huang, Andrew Dai,\r\nHongkun Yu, Slav Petrov, Ed H. Chi, Jeff Dean, Jacob Devlin, Adam Roberts, Denny Zhou, Quoc V. Le,\r\nand Jason Wei. 2022. Scaling instruction-finetuned\r\nlanguage models. arXiv preprint arXiv:2210.11416.\r\nEmily Dinan, Stephen Roller, Kurt Shuster, Angela\r\nFan, Michael Auli, and Jason Weston. 2019. Wizard\r\nof Wikipedia: Knowledge-powered conversational\r\nagents. In International Conference on Learning\r\nRepresentations.\r\nZi-Yi Dou, Pengfei Liu, Hiroaki Hayashi, Zhengbao\r\nJiang, and Graham Neubig. 2021. GSum: A general framework for guided neural abstractive summarization. In Proceedings of the 2021 Conference of\r\nthe North American Chapter of the Association for\r\nComputational Linguistics: Human Language Technologies, pages 4830–4842, Online. Association for\r\nComputational Linguistics.','2024-08-20 04:39:29','2024-08-20 04:39:29',54,''),('chunk-baba20af-7b3d-4294-a8b5-88f4da813fe2','Hemant Pugaliya, James Route, Kaixin Ma, Yixuan\r\nGeng, and Eric Nyberg. 2019. Bend but don’t break?\r\nmulti-challenge stress test for QA models. In Proceedings of the 2nd Workshop on Machine Reading\r\nfor Question Answering, pages 125–136, Hong Kong,\r\nChina. Association for Computational Linguistics.\r\nFreda Shi, Xinyun Chen, Kanishka Misra, Nathan\r\nScales, David Dohan, Ed Chi, Nathanael Schärli, and\r\nDenny Zhou. 2023. Large language models can be\r\neasily distracted by irrelevant context. arXiv preprint\r\narXiv:2302.00093.\r\nKurt Shuster, Spencer Poff, Moya Chen, Douwe Kiela,\r\nand Jason Weston. 2021. Retrieval augmentation\r\nreduces hallucination in conversation. In Findings\r\nof the Association for Computational Linguistics:\r\nEMNLP 2021, pages 3784–3803, Punta Cana, Dominican Republic. Association for Computational\r\nLinguistics.\r\nJames Thorne, Andreas Vlachos, Christos\r\nChristodoulopoulos, and Arpit Mittal. 2018.\r\nFEVER: a large-scale dataset for fact extraction','2024-08-20 04:39:29','2024-08-20 04:39:29',65,''),('chunk-be80f7c7-3826-4e7b-8080-5a0f5930e36c','6.2 Generation Performance\r\nAs shown in Table 5, our main method FILCO\r\nsurpasses the full-context (FULL) and passagefiltering (PSGS) settings by a large margin, +1.2 −\r\n14.2 points in all six tasks. FILCO also outperforms existing performant baselines. Compared to\r\nusing top-1 passages only, performance increases\r\non extractive tasks when aggregating multiple topranked passages. Interestingly, performance on\r\nFEVER and WoW drop by −3.2 and −2.3 points,\r\npotentially due to the decreased retrieval quality of\r\nlower-ranked passages, as the top-1 retrieval recall\r\nis relatively high.\r\nContext NQ TQA HotpotQA ELI5 FEVER WoW\r\nBASELINE, TOP 5\r\nRAG 44.5 56.8 - - 88.1 13.8\r\nFID 48.3 67.2 - - 89.5 16.9\r\nEVI. 49.8 67.8 - - 89.8 17.9\r\nFILCO, TOP 1\r\nFILCO 44.7 59.0 60.0 73.8 94.2 68.3\r\nFILCO, TOP 5\r\nFULL 47.6 67.3 61.5 72.7 88.0 64.8\r\nPSGS 52.9 69.1 62.3 73.7 90.7 64.6\r\nFILCO 61.8 71.1 65.0 73.9 91.4 66.0\r\nSILVER 62.0 71.1 65.2 73.9 92.2 66.1','2024-08-20 04:39:29','2024-08-20 04:39:29',45,''),('chunk-bf404546-8ee8-471f-ac39-5e1c56eb21ff','arXiv preprint arXiv:2305.06984.\r\nVladimir Karpukhin, Barlas Oguz, Sewon Min, Patrick\r\nLewis, Ledell Wu, Sergey Edunov, Danqi Chen, and\r\nWen-tau Yih. 2020. Dense passage retrieval for opendomain question answering. In Proceedings of the\r\n2020 Conference on Empirical Methods in Natural\r\nLanguage Processing (EMNLP), pages 6769–6781,\r\nOnline. Association for Computational Linguistics.\r\nUrvashi Khandelwal, Angela Fan, Dan Jurafsky, Luke\r\nZettlemoyer, and Mike Lewis. 2021. Nearest neighbor machine translation. In International Conference\r\non Learning Representations.\r\nUrvashi Khandelwal, Omer Levy, Dan Jurafsky, Luke\r\nZettlemoyer, and Mike Lewis. 2020. Generalization\r\nthrough memorization: Nearest neighbor language\r\nmodels. In International Conference on Learning\r\nRepresentations.\r\nTomáš Kociský, Jonathan Schwarz, Phil Blunsom, Chris ˇ\r\nDyer, Karl Moritz Hermann, Gábor Melis, and Edward Grefenstette. 2018. The NarrativeQA reading','2024-08-20 04:39:29','2024-08-20 04:39:29',59,''),('chunk-c43180e8-7d80-4e2f-8871-d92f1b85bc09','4.1 Experimental Setup\r\nWe use FLAN-T5 (Chung et al., 2022) and LLAMA\r\n2 (Touvron et al., 2023) as the backbone model\r\narchitectures, because of their potential superior\r\nperformance among open-source models. We finetune both models for (i) the context filtering task\r\nas Mctx, and (ii) the end generation task as Mgen.\r\nFLAN-T5 FLAN-T5 is a family of instructiontuned encoder-decoder models for seq2seq generation tasks, which makes it suitable for our retrievalaugmented generation setting. Due to constraints\r\nin computational resources, we use the XL version\r\nwith 3B parameters. We load model checkpoints\r\nfrom and implement training using HuggingFace\r\nTransformers (Wolf et al., 2020).\r\nLLAMA 2 LLAMA 2 represents a collection of\r\nfoundation model ranging from 7B to 70B parameters, particularly optimized for dialog uses cases,\r\nbut also achieve good performance on many other\r\ntasks. We train the 7B model version with LoRA\r\n(Hu et al., 2022) using the xTuring platform.6','2024-08-20 04:39:29','2024-08-20 04:39:29',27,''),('chunk-ca2a68ee-f230-4a4e-ae53-888e1169f336','{t\r\nj\r\ni\r\n}, ∀j ∈ ni, ∀i ∈ K are provided to the model.\r\nIn experiments, we split passages into sentences\r\nusing the spaCy tokenizer2as candidate text spans.\r\nLater in §5, we will show that sentence-wise splitting performs the best among other granularities.\r\n2.2 Obtaining Oracle Contexts\r\nIn this section, we propose methods that select oracle text spans that can be used to train a context\r\nfiltering model. We select spans using a filtering\r\nfunction F(⋅), denoted as F(T∣e, P), where text\r\nspans in T = {t\r\nj\r\ni\r\n} are selected by the underlying\r\nscore function f(⋅) according to individual filtering methods. We select a single best span T = t\r\nj\r\ni\r\n,\r\n(i, j) = arg maxi,j f(t\r\nj\r\ni\r\n, e) when using oracle filtering, as it outperforms multi-span filtering in our\r\npreliminary studies.\r\n2\r\nhttps://spacy.io/api/tokenizer','2024-08-20 04:39:29','2024-08-20 04:39:29',11,''),('chunk-caeb2517-b3a2-491c-abe8-fa6a09604d51','toward faithful generations in more scenarios.\r\nLimitations\r\nOur proposed method has been shown effective\r\nacross various tasks, however, may be in certain\r\ndata domains, under automatic evaluation metrics,\r\nand with sufficient computational resources.\r\nOur approach is domain-agnostic in principle,\r\nhowever, all the datasets we experiment with are\r\nbuilt from Wikipedia articles, i.e., the open domain.\r\nTasks of other domains such as news (Trischler','2024-08-20 04:39:29','2024-08-20 04:39:29',50,''),('chunk-cdc1aef1-a709-41b5-9bd3-b210212aa30b','the North American Chapter of the Association for\r\nComputational Linguistics: Human Language Technologies, pages 4830–4842, Online. Association for\r\nComputational Linguistics.\r\nAngela Fan, Yacine Jernite, Ethan Perez, David Grangier, Jason Weston, and Michael Auli. 2019. ELI5:\r\nLong form question answering. In Proceedings of\r\nthe 57th Annual Meeting of the Association for Computational Linguistics, pages 3558–3567, Florence,\r\nItaly. Association for Computational Linguistics.\r\nYair Feldman and Ran El-Yaniv. 2019. Multi-hop paragraph retrieval for open-domain question answering.\r\nIn Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics, pages 2296–\r\n2309, Florence, Italy. Association for Computational\r\nLinguistics.\r\nPatrick Fernandes, Kayo Yin, Graham Neubig, and André F. T. Martins. 2021. Measuring and increasing\r\ncontext usage in context-aware machine translation.\r\nIn Proceedings of the 59th Annual Meeting of the','2024-08-20 04:39:29','2024-08-20 04:39:29',55,''),('chunk-ce96511e-0e5b-4781-b699-8259fafd9824','Linguistics.\r\nJames Thorne, Andreas Vlachos, Christos\r\nChristodoulopoulos, and Arpit Mittal. 2018.\r\nFEVER: a large-scale dataset for fact extraction\r\nand VERification. In Proceedings of the 2018\r\nConference of the North American Chapter of\r\nthe Association for Computational Linguistics:\r\nHuman Language Technologies, Volume 1 (Long\r\nPapers), pages 809–819, New Orleans, Louisiana.\r\nAssociation for Computational Linguistics.\r\nHugo Touvron, Louis Martin, Kevin Stone, Peter Albert, Amjad Almahairi, Yasmine Babaei, Nikolay\r\nBashlykov, Soumya Batra, Prajjwal Bhargava, Shruti\r\nBhosale, et al. 2023. Llama 2: Open foundation and fine-tuned chat models. arXiv preprint\r\narXiv:2307.09288.\r\nAdam Trischler, Tong Wang, Xingdi Yuan, Justin Harris, Alessandro Sordoni, Philip Bachman, and Kaheer\r\nSuleman. 2017. NewsQA: A machine comprehension dataset. In Proceedings of the 2nd Workshop\r\non Representation Learning for NLP, pages 191–200,\r\nVancouver, Canada. Association for Computational','2024-08-20 04:39:29','2024-08-20 04:39:29',66,''),('chunk-cfd448ae-a378-41be-b75b-dd4f6e7a1352','it easier for the generator to predict the correct answer.\r\nIdeally, a model should be grounded on the precisely supporting content to generate the correct\r\noutput. However, this ideal grounding is hard to\r\nachieve with an imperfect retrieval system alone.\r\nOn one hand, positive passages (i.e., passages that\r\nsupport the output) sometimes contain distracting\r\ncontent. For example in Figure 1, while the passage\r\ncontaining the actual supporting content is successfully retrieved, the model still fails to pay sufficient\r\nattention to the supporting content, and is distracted\r\nby surrounding sentences that share similar topics\r\n(Shi et al., 2023). On the other hand, models learn\r\nto over-utilize negative passages in the same way\r\nas using positive passages, e.g., extracting a span\r\nfrom the irrelevant passage, which would inevitably\r\nbe incorrect. This potentially degrades accuracy, as\r\ntraining with higher-quality context often leads to\r\nbetter performance (Dou et al., 2021).','2024-08-20 04:39:29','2024-08-20 04:39:29',5,''),('chunk-d204139a-773e-4f68-88f0-523bd7c3e4c9','For more complex QA tasks, our method brings\r\n+1.0 and +1.3 F1 increase in HotpotQA with\r\nFLAN-T5 and LLAMA2 models, and +0.6, +2.6\r\nEM increase in ELI5. The overall improvement is\r\nless significant, compared to extractive QA tasks,\r\npresumably due to the increased task difficulty.\r\nFor abstractive generation tasks, our method\r\nbrings about even larger improvements: +6.2 and\r\n+4.3 accuracy increase for FEVER with FLANT5 and LLAMA2, and +3.5, +1.1 F1 increase for\r\nWoW. As could be partially conjectured from the\r\nlow precision in Table 2, filtering irrelevant content\r\nhelps the model focus on the concerned knowledge.\r\n4.4 Generation With Filtered Positive and\r\nNegative Passages\r\nWe decompose datasets into examples with positive\r\nand negative top-1 retrieved passages, to examine\r\nimprovements under both scenarios.\r\nAs shown in Figure 5, for both positive and negative passages retrieved, applying FILCO effectively\r\nimproves the context quality, hence yields better','2024-08-20 04:39:29','2024-08-20 04:39:29',33,''),('chunk-d360053c-0fd2-4cb9-99f1-59669d32e8a6','Long-Form Question Answering Another complex QA task is generating long, abstract answers\r\ngiven the question, i.e., long-form QA. For this\r\nwe use the ELI5 (Fan et al., 2019) dataset, which\r\nrequires elaborate and in-depth answers to openended questions. The dataset comprises 270K\r\nthreads from the Reddit forum “Explain Like I’m\r\nFive” (ELI5) and features diverse questions requiring multi-sentence answers. We experiment with\r\nthe generative short setting, and evaluate model\r\npredictions using unigram F1.\r\nFact Verification We use the Fact Extraction\r\nand VERification (FEVER) dataset (Thorne et al.,\r\n2018) aggregated by the KILT benchmark (Petroni\r\net al., 2021). It contains claims q generated by\r\nrephrasing sentences in Wikipedia articles. A claim\r\nhas the label o = “SUPPORTS” if it preserves the\r\nfact in the Wikipedia reference, otherwise is labeled\r\nas “REFUTES” due to the fact contradiction. Following the original baseline (Thorne et al., 2018),','2024-08-20 04:39:29','2024-08-20 04:39:29',21,''),('chunk-d3ae003e-c5a6-40f3-9f30-3ef96c798b21','Learning to Filter Context for Retrieval-Augmented Generation\r\nZhiruo Wang♠Jun Araki♦Zhengbao Jiang♠\r\nMd Rizwan Parvez♦ Graham Neubig♠\r\n♠\r\nCarnegie Mellon University ♦Bosch Research\r\n{zhiruow,zhengbaj,gneubig}@cs.cmu.edu\r\nAbstract\r\nOn-the-fly retrieval of relevant knowledge has\r\nproven an essential element of reliable systems\r\nfor tasks such as open-domain question answering and fact verification. However, because retrieval systems are not perfect, generation models are required to generate outputs given partially or entirely irrelevant passages. This can\r\ncause over- or under-reliance on context, and\r\nresult in problems in the generated output such\r\nas hallucinations. To alleviate these problems,\r\nwe propose FILCO, a method that improves the\r\nquality of the context provided to the generator by (1) identifying useful context based on\r\nlexical and information-theoretic approaches,\r\nand (2) training context filtering models that','2024-08-20 04:39:29','2024-08-20 04:39:29',1,''),('chunk-d90d942f-0c30-476e-8ec5-606b0f5c2351','FILCO 44.7 59.0 60.0 73.8 94.2 68.3\r\nFILCO, TOP 5\r\nFULL 47.6 67.3 61.5 72.7 88.0 64.8\r\nPSGS 52.9 69.1 62.3 73.7 90.7 64.6\r\nFILCO 61.8 71.1 65.0 73.9 91.4 66.0\r\nSILVER 62.0 71.1 65.2 73.9 92.2 66.1\r\nTable 5: Generation results when providing top-5 retrieved passages filtered by passages or sentences. RAG,\r\nFID, and EVI. are top-performing methods. We boldtype the best results that do not use silver contexts.\r\n7 Related Work\r\nAugmented Generation Providing additional\r\ncontexts to generation has shown to be effective (Lewis et al., 2020; Guu et al., 2020; Mialon et al., 2023) across many knowledge-intensive\r\ntasks (Petroni et al., 2021). While the most common approach with a set of retrieved passages is\r\nto append them all to the input, some works explored the optimal granularity and strategy to do\r\nthis. Wang et al. (2019) identify 100 words to be\r\nthe optimal size for candidate passages, which then\r\nbecame the de facto length. Many works explored','2024-08-20 04:39:29','2024-08-20 04:39:29',46,''),('chunk-da151d9e-cd3d-4952-983c-570cc592fedd','formance of retrieval results.\r\nTo retrieve Wikipedia passages for all examples,\r\nwe use the adversarial Dense Passage Retriever\r\n(DPR) (Karpukhin et al., 2020)\r\n5\r\nto retrieve the top\r\n5 passages from all Wikipedia passages.\r\nA Mixture of Positive and Negative Passages\r\nWe evaluate the recall of the top 1 and top 5 retrieved passages in Table 2. For the extractive NQ\r\nand TQA tasks, we measure if any of the passages\r\ncontain the answer strings. For the other four tasks\r\nwhere outputs are not spans in supporting documents, we calculate if any of the passages come\r\nfrom the provenance articles annotated in KILT.\r\nNotably, for all six datasets, top-1 passages only\r\nsupport the canonical output half or less of the time.\r\nAlthough involving more passages increases the\r\ncoverage of supporting documents, it often brings\r\nalong linearly (Izacard and Grave, 2021) or quadratically increased computation.\r\nDataset Recall (pos. + neg.) Precision (pos.)\r\n1 5 1 5\r\nNQ 50.1 74.1 2.5 2.7','2024-08-20 04:39:29','2024-08-20 04:39:29',24,''),('chunk-dd4e68b9-2987-4e0d-9bcb-75b9ac364628','Knowledge Retrieval and Language Models.\r\nAkari Asai, Matt Gardner, and Hannaneh Hajishirzi. 2022. Evidentiality-guided generation for\r\nknowledge-intensive NLP tasks. In Proceedings of\r\nthe 2022 Conference of the North American Chapter of the Association for Computational Linguistics:\r\nHuman Language Technologies, pages 2226–2243,\r\nSeattle, United States. Association for Computational\r\nLinguistics.\r\nEunsol Choi, Jennimaria Palomaki, Matthew Lamm,\r\nTom Kwiatkowski, Dipanjan Das, and Michael\r\nCollins. 2021. Decontextualization: Making sentences stand-alone. Transactions of the Association\r\nfor Computational Linguistics, 9:447–461.\r\nHyung Won Chung, Le Hou, Shayne Longpre, Barret\r\nZoph, Yi Tay, William Fedus, Yunxuan Li, Xuezhi\r\nWang, Mostafa Dehghani, Siddhartha Brahma, Albert Webson, Shixiang Shane Gu, Zhuyun Dai,\r\nMirac Suzgun, Xinyun Chen, Aakanksha Chowdhery, Alex Castro-Ros, Marie Pellat, Kevin Robinson,\r\nDasha Valter, Sharan Narang, Gaurav Mishra, Adams','2024-08-20 04:39:29','2024-08-20 04:39:29',53,''),('chunk-e1874626-1674-4fdb-a6e5-f941c220d95d','overlap to an erroneous claim may reinforce the\r\nmisinformation and lead to incorrect generations.\r\nConditional Cross-Mutual Information (CXMI)\r\nWe adopt a measure fcxmi from the conditional\r\ncross-mutual information (CXMI) score in contextual machine translation (Fernandes et al., 2021).\r\nGiven a pair of input sequences with and without\r\ncontext augmentation, t ⊕ q and q, we measure the\r\nprobability difference in model Mgen generating\r\nthe expected output o, the process being denoted\r\nas fcxmi(t, e) =\r\nMgen(o∣t⊕q)\r\nMgen(o∣q)\r\n∈ R, as illustrated\r\nin Figure 3. We select the text span t\r\nj\r\ni\r\nhaving the\r\nhighest CXMI score above a pre-defined threshold\r\n3We compare different thresholds (0.1, 0.3, 0.5, 0.7, 0.9)\r\nin preliminary studies, 0.5 gives the best generation results.\r\nλ = 0.0,\r\n4 where (i, j) = arg maxi,j(fcxmi(t\r\nj\r\ni\r\n, e)),\r\nand i, j ∈ {i, j ∣ fcxmi(t\r\nj\r\ni\r\n, e) > λ}. fcxmi can\r\novercome the lexical barrier and is applicable to all','2024-08-20 04:39:29','2024-08-20 04:39:29',14,''),('chunk-e299af8e-6707-4ab1-8ee9-b90558e475a8','and (3) knowledge-grounded dialog generation:\r\nWizard of Wikipedia (WoW).\r\nUsing FLAN-T5 and LLAMA2 models, our\r\nmethod outperforms both baseline methods, i.e.,\r\nfull-context augmentation and passage-wise filtering, on all six datasets. FILCO also greatly reduces\r\nthe prompt length by 44 − 64% across tasks. We\r\nfurther split examples retrieved with positive and\r\nnegative passages, and show that FILCO effectively\r\nimproves generation in both scenarios (§4).\r\nComparing filtering methods on each task, we\r\nobserve that STRINC, LEXICAL and CXMI-based\r\nfiltering were best for extractive QA, dialog generation, and more complex tasks, respectively (§5).\r\nLastly, we extend experiments to the more complex\r\nmulti-passage setting, where FILCO maintains its\r\nadvantage over baseline methods (§6).\r\n2 Generation with Filtered Contexts\r\nIn this section, we first outline notation (§2.1), then\r\nintroduce three oracle filtering strategies (§2.2).\r\nNext, we describe how to train context filtering','2024-08-20 04:39:29','2024-08-20 04:39:29',9,''),('chunk-e3121de7-9627-4774-b596-b437a88f84ad','2 Generation with Filtered Contexts\r\nIn this section, we first outline notation (§2.1), then\r\nintroduce three oracle filtering strategies (§2.2).\r\nNext, we describe how to train context filtering\r\nmodels with oracle filtered context (§2.3) and learn\r\nto generate with filtered contexts (§2.4).\r\n2.1 Problem Statement\r\nIn retrieval-augmented generation, we are given\r\nan input query q and annotated output o from an\r\nexample e = {q, o}, and want to improve the output of a generative model Mgen. We assume a set\r\nof retrieved passages P = {pi}, i ∈ K, each consisting of ni\r\ntext spans pi = [t\r\n1\r\ni\r\n,⋯, tni\r\ni\r\n]. We can\r\nprovide the model with one or more selected text\r\nspans T = {t\r\nj\r\ni\r\n} when generating output o, namely\r\nMgen(o ∣ q, T). In traditional retrieval-based methods, however, all text spans in the top-K passages\r\n{t\r\nj\r\ni\r\n}, ∀j ∈ ni, ∀i ∈ K are provided to the model.\r\nIn experiments, we split passages into sentences\r\nusing the spaCy tokenizer2as candidate text spans.','2024-08-20 04:39:29','2024-08-20 04:39:29',10,''),('chunk-e43b1fd4-d008-4743-bf94-ce3588494d96','Optimizing Retrieval for Augmentation Many\r\nworks focus on post-process retrieved content to\r\naugment the generation. A common approach is\r\nto rerank retrieved passages and provide only the\r\ntop few under limited input capacity, based on the\r\nsimilarity between query and passages (Nogueira\r\nand Cho, 2020), the majority of reader predictions\r\n(Mao et al., 2021), and utility for generation (Wang\r\net al., 2018). Asai et al. (2022) measures the evidentiality of retrieved passages to improve context quality, by removing irrelevant passages and\r\nskipping the retrieval step (Mallen et al., 2023).\r\nNonetheless, these methods operate on the coarse\r\npassage level, thus still suffering from in-passage\r\ndistractions. Our method has similarities to answer\r\nsentence selection (Yu et al., 2014), which can operate at a more fine-grained sentence level. Yet\r\nfurther, our filtering can apply to text split in arbitrary granularity that optimizes the task of interest,','2024-08-20 04:39:29','2024-08-20 04:39:29',48,''),('chunk-e84fd350-f10a-4da1-b9c5-51bd904cf9cc','λ = 0.0,\r\n4 where (i, j) = arg maxi,j(fcxmi(t\r\nj\r\ni\r\n, e)),\r\nand i, j ∈ {i, j ∣ fcxmi(t\r\nj\r\ni\r\n, e) > λ}. fcxmi can\r\novercome the lexical barrier and is applicable to all\r\ntasks, however at the cost of more computation.\r\nq: The horse began to become domesticated around 2000 BC.\r\nt1: How and when horses became domesticated is disputed.\r\nt2: The clearest evidence of early use of the horse as a means of \r\ntransport is from chariot burials dated c. 2000 BCE.\r\nt3: However, an increasing amount of evidence supports the \r\nhypothesis that horses were domesticated in the Eurasian Steppes \r\napproximately 3500 BCE\r\nP\r\nq t1\r\nhighest \r\nCXMI\r\nq t2\r\nq t3\r\nScore\r\nCalculation \r\nfcxmi\r\n1.2\r\n0.9\r\n2.0\r\nq\r\nq t\r\nMgen REFUTES\r\noutput o probability\r\npctx\r\np\r\n2.0\r\nCXMI\r\nFigure 3: An example illustration of context filtering\r\nwith the CXMI strategy.\r\n2.3 Learning to Filter Contexts\r\nWhile the previous section described how to identify useful contexts at training time when the gold','2024-08-20 04:39:29','2024-08-20 04:39:29',15,''),('chunk-ec479f89-5ce1-4545-8bc5-87f4d9744d67','quality of the context provided to the generator by (1) identifying useful context based on\r\nlexical and information-theoretic approaches,\r\nand (2) training context filtering models that\r\ncan filter retrieved contexts at test time. We experiment on six knowledge-intensive tasks with\r\nFLAN-T5 and LLAMA2, and demonstrate that\r\nour method outperforms existing approaches on\r\nextractive question answering (QA), complex\r\nmulti-hop and long-form QA, fact verification,\r\nand dialog generation tasks. FILCO effectively\r\nimproves the quality of context, whether or not\r\nit supports the canonical output.1\r\n1 Introduction\r\nRetrieval augmented approaches to generation\r\nhave been shown effective for many knowledgeintensive language tasks such as open-domain question answering and fact verification, producing\r\nmore faithful (Khandelwal et al., 2020; Lewis et al.,\r\n2020; Shuster et al., 2021; Komeili et al., 2022),\r\ninterpretable (Guu et al., 2020), and generalizable','2024-08-20 04:39:29','2024-08-20 04:39:29',2,''),('chunk-f0ba7a2f-5a30-4a6b-9aa1-76fa40637e72','more faithful (Khandelwal et al., 2020; Lewis et al.,\r\n2020; Shuster et al., 2021; Komeili et al., 2022),\r\ninterpretable (Guu et al., 2020), and generalizable\r\n(Khandelwal et al., 2021) outputs. While the de\r\nfacto approach is to provide the top retrieved passages to the generator indiscriminately, imperfect\r\nretrieval systems often return irrelevant or distracting content. Generation models are then trained to\r\nproduce canonical outputs with the guidance of partially or entirely irrelevant passages, and thus are\r\nprone to hallucination or spurious memorization.\r\n1\r\nhttps://github.com/zorazrw/filco\r\nGenerator\r\ninfrastructure necessary for rapid industrial growth was \r\nput in place. The first railway in Belgium, running from \r\nnorthern Brussels to Mechelen, was completed in May \r\n1835. The earliest railway in Britain was a wagonway \r\nsystem, a horse drawn wooden rail system, used by \r\nGerman miners at Caldbeck, Cumbria, England, perhaps','2024-08-20 04:39:29','2024-08-20 04:39:29',3,''),('chunk-f752fe4f-014d-4e36-9d9a-548edc6525d1','context usage in context-aware machine translation.\r\nIn Proceedings of the 59th Annual Meeting of the\r\nAssociation for Computational Linguistics and the\r\n11th International Joint Conference on Natural Language Processing (Volume 1: Long Papers), pages\r\n6467–6478, Online. Association for Computational\r\nLinguistics.\r\nKelvin Guu, Kenton Lee, Zora Tung, Panupong Pasupat,\r\nand Ming-Wei Chang. 2020. REALM: Retrievalaugmented language model pre-training. In International Conference on Machine Learning. JMLR.org.\r\nEdward J Hu, yelong shen, Phillip Wallis, Zeyuan AllenZhu, Yuanzhi Li, Shean Wang, Lu Wang, and Weizhu\r\nChen. 2022. LoRA: Low-rank adaptation of large\r\nlanguage models. In International Conference on\r\nLearning Representations.\r\nGautier Izacard and Edouard Grave. 2021. Leveraging\r\npassage retrieval with generative models for open domain question answering. In Proceedings of the 16th','2024-08-20 04:39:29','2024-08-20 04:39:29',56,''),('chunk-f7638891-d78e-4978-9d0c-ff56f79a1b26','WOW 63.7 3.1 2.9 F1\r\nTable 1: Statistics and evaluation metric for six tasks.\r\nTable 1 lists the dataset statistics. Because test\r\nsets are not available for datasets adopted from the\r\nKILT benchmark (i.e., HotpotQA, ELI5, FEVER,\r\nWoW), we report the development set results.\r\n3.2 Wikipedia Passage Retrieval\r\nTo better understand the quality of passages provided in the generation stage, we evaluate the per-','2024-08-20 04:39:29','2024-08-20 04:39:29',23,''),('chunk-fe1a89b7-2e9c-47ee-accf-4f9a425e14cd','with the CXMI strategy.\r\n2.3 Learning to Filter Contexts\r\nWhile the previous section described how to identify useful contexts at training time when the gold\r\nstandard answer is known, we also need methods\r\nthat can apply at test time when the answer is unknown. To this end, we train the context filtering\r\nmodels, Mctx, using context filtered with the three\r\nmeasures in §2.2. To create training data for Mctx,\r\nfor each training example with query q, we concatenate the retrieved passages P and query q as input,\r\nthen, we apply the filter method f to obtain filtered\r\ncontext tsilver as output. We use silver instead\r\nof oracle to represent the non-perfect filtering result due to unknown gold labels for non-extractive\r\ntasks. As shown in Figure 2, we train Mctx by feeding in query q and retrieved passages P, and ask\r\nit to generate filtered context tsilver, formalized as\r\nMctx(tsilver∣ q ⊕ P).\r\nAt test time, given the retrieved passages P','2024-08-20 04:39:29','2024-08-20 04:39:29',16,''),('chunk-ff5f35ae-eb03-4679-946d-1353661d9515','Kelcey, Ming-Wei Chang, Andrew M. Dai, Jakob\r\nUszkoreit, Quoc Le, and Slav Petrov. 2019. Natural questions: A benchmark for question answering\r\nresearch. Transactions of the Association for Computational Linguistics, 7:452–466.\r\nJinhyuk Lee, Alexander Wettig, and Danqi Chen. 2021.\r\nPhrase retrieval learns passage retrieval, too. In Proceedings of the 2021 Conference on Empirical Methods in Natural Language Processing, pages 3661–\r\n3672, Online and Punta Cana, Dominican Republic.\r\nAssociation for Computational Linguistics.\r\nKenton Lee, Ming-Wei Chang, and Kristina Toutanova.\r\n2019. Latent retrieval for weakly supervised open\r\ndomain question answering. In Proceedings of the\r\n57th Annual Meeting of the Association for Computational Linguistics, pages 6086–6096, Florence, Italy.\r\nAssociation for Computational Linguistics.\r\nPatrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio','2024-08-20 04:39:29','2024-08-20 04:39:29',61,'');
/*!40000 ALTER TABLE `chunks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `conversation_id` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `project_id` varchar(45) NOT NULL,
  PRIMARY KEY (`conversation_id`),
  UNIQUE KEY `conversation_id_UNIQUE` (`conversation_id`),
  KEY `fk_conversations_projects1_idx` (`project_id`),
  CONSTRAINT `fk_conversations_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations_has_documents`
--

DROP TABLE IF EXISTS `conversations_has_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations_has_documents` (
  `conversation_id` varchar(45) NOT NULL,
  `document_id` varchar(45) NOT NULL,
  PRIMARY KEY (`conversation_id`,`document_id`),
  KEY `fk_conversations_has_documents_documents1_idx` (`document_id`),
  KEY `fk_conversations_has_documents_conversations1_idx` (`conversation_id`),
  CONSTRAINT `fk_conversations_has_documents_conversations1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`conversation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_conversations_has_documents_documents1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations_has_documents`
--

LOCK TABLES `conversations_has_documents` WRITE;
/*!40000 ALTER TABLE `conversations_has_documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations_has_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_images`
--

DROP TABLE IF EXISTS `document_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_images` (
  `image_id` varchar(45) NOT NULL,
  `image_path` varchar(500) NOT NULL,
  `caption` varchar(500) NOT NULL DEFAULT 'No caption',
  `page_in_ref` int NOT NULL,
  `order_in_ref` int NOT NULL,
  `document_id` varchar(45) NOT NULL,
  PRIMARY KEY (`image_id`),
  UNIQUE KEY `image_id_UNIQUE` (`image_id`),
  KEY `fk_document_images_documents1_idx` (`document_id`),
  CONSTRAINT `fk_document_images_documents1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_images`
--

LOCK TABLES `document_images` WRITE;
/*!40000 ALTER TABLE `document_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `document_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_images_has_tags`
--

DROP TABLE IF EXISTS `document_images_has_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_images_has_tags` (
  `document_images_image_id` varchar(45) NOT NULL,
  `tags_tag_id` varchar(45) NOT NULL,
  PRIMARY KEY (`document_images_image_id`,`tags_tag_id`),
  KEY `fk_document_images_has_tags_tags1_idx` (`tags_tag_id`),
  KEY `fk_document_images_has_tags_document_images1_idx` (`document_images_image_id`),
  CONSTRAINT `fk_document_images_has_tags_document_images1` FOREIGN KEY (`document_images_image_id`) REFERENCES `document_images` (`image_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_document_images_has_tags_tags1` FOREIGN KEY (`tags_tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_images_has_tags`
--

LOCK TABLES `document_images_has_tags` WRITE;
/*!40000 ALTER TABLE `document_images_has_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `document_images_has_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_tables`
--

DROP TABLE IF EXISTS `document_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_tables` (
  `table_id` varchar(45) NOT NULL,
  `table_path` varchar(500) NOT NULL,
  `caption` varchar(500) NOT NULL DEFAULT 'No caption',
  `page_in_document` int NOT NULL,
  `order_in_document` int NOT NULL,
  `document_id` varchar(45) NOT NULL,
  PRIMARY KEY (`table_id`),
  UNIQUE KEY `table_id_UNIQUE` (`table_id`),
  KEY `fk_document_tables_documents1_idx` (`document_id`),
  CONSTRAINT `fk_document_tables_documents1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_tables`
--

LOCK TABLES `document_tables` WRITE;
/*!40000 ALTER TABLE `document_tables` DISABLE KEYS */;
/*!40000 ALTER TABLE `document_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_tables_has_tags`
--

DROP TABLE IF EXISTS `document_tables_has_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_tables_has_tags` (
  `document_tables_table_id` varchar(45) NOT NULL,
  `tags_tag_id` varchar(45) NOT NULL,
  PRIMARY KEY (`document_tables_table_id`,`tags_tag_id`),
  KEY `fk_document_tables_has_tags_tags1_idx` (`tags_tag_id`),
  KEY `fk_document_tables_has_tags_document_tables1_idx` (`document_tables_table_id`),
  CONSTRAINT `fk_document_tables_has_tags_document_tables1` FOREIGN KEY (`document_tables_table_id`) REFERENCES `document_tables` (`table_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_document_tables_has_tags_tags1` FOREIGN KEY (`tags_tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_tables_has_tags`
--

LOCK TABLES `document_tables_has_tags` WRITE;
/*!40000 ALTER TABLE `document_tables_has_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `document_tables_has_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `document_id` varchar(45) NOT NULL,
  `document_name` varchar(255) NOT NULL,
  `document_path` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` enum('pdf','page','url') NOT NULL,
  `project_id` varchar(45) NOT NULL,
  PRIMARY KEY (`document_id`),
  UNIQUE KEY `file_id_UNIQUE` (`document_id`),
  KEY `fk_documents_projects1_idx` (`project_id`),
  CONSTRAINT `fk_documents_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents_has_tags`
--

DROP TABLE IF EXISTS `documents_has_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents_has_tags` (
  `documents_document_id` varchar(45) NOT NULL,
  `tags_tag_id` varchar(45) NOT NULL,
  PRIMARY KEY (`documents_document_id`,`tags_tag_id`),
  KEY `fk_documents_has_tags_tags1_idx` (`tags_tag_id`),
  KEY `fk_documents_has_tags_documents1_idx` (`documents_document_id`),
  CONSTRAINT `fk_documents_has_tags_documents1` FOREIGN KEY (`documents_document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_documents_has_tags_tags1` FOREIGN KEY (`tags_tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents_has_tags`
--

LOCK TABLES `documents_has_tags` WRITE;
/*!40000 ALTER TABLE `documents_has_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents_has_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `note_id` varchar(45) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` varchar(5000) NOT NULL,
  `project_id` varchar(45) NOT NULL,
  PRIMARY KEY (`note_id`),
  UNIQUE KEY `note_id_UNIQUE` (`note_id`),
  KEY `fk_notes_projects1_idx` (`project_id`),
  CONSTRAINT `fk_notes_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 KEY_BLOCK_SIZE=8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES ('note-766fd330-aea1-4995-a900-b35cd5ede91e','hello','2024-08-19 02:57:39','2024-08-19 02:57:39','hii','');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes_has_chunks`
--

DROP TABLE IF EXISTS `notes_has_chunks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes_has_chunks` (
  `notes_note_id` varchar(45) NOT NULL,
  `chunks_chunk_id` varchar(45) NOT NULL,
  PRIMARY KEY (`notes_note_id`,`chunks_chunk_id`),
  KEY `fk_notes_has_chunks_chunks1_idx` (`chunks_chunk_id`),
  KEY `fk_notes_has_chunks_notes1_idx` (`notes_note_id`),
  CONSTRAINT `fk_notes_has_chunks_chunks1` FOREIGN KEY (`chunks_chunk_id`) REFERENCES `chunks` (`chunk_id`),
  CONSTRAINT `fk_notes_has_chunks_notes1` FOREIGN KEY (`notes_note_id`) REFERENCES `notes` (`note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes_has_chunks`
--

LOCK TABLES `notes_has_chunks` WRITE;
/*!40000 ALTER TABLE `notes_has_chunks` DISABLE KEYS */;
/*!40000 ALTER TABLE `notes_has_chunks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes_has_tags`
--

DROP TABLE IF EXISTS `notes_has_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes_has_tags` (
  `notes_note_id` varchar(45) NOT NULL,
  `tags_tag_id` varchar(45) NOT NULL,
  PRIMARY KEY (`notes_note_id`,`tags_tag_id`),
  KEY `fk_notes_has_tags_tags1_idx` (`tags_tag_id`),
  KEY `fk_notes_has_tags_notes1_idx` (`notes_note_id`),
  CONSTRAINT `fk_notes_has_tags_notes1` FOREIGN KEY (`notes_note_id`) REFERENCES `notes` (`note_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_notes_has_tags_tags1` FOREIGN KEY (`tags_tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes_has_tags`
--

LOCK TABLES `notes_has_tags` WRITE;
/*!40000 ALTER TABLE `notes_has_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `notes_has_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` varchar(45) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`),
  UNIQUE KEY `notebook_id_UNIQUE` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_has_users`
--

DROP TABLE IF EXISTS `projects_has_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_has_users` (
  `project_id` varchar(45) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `role` enum('member','leader') NOT NULL,
  PRIMARY KEY (`project_id`,`user_id`),
  KEY `fk_projects_has_users_users1_idx` (`user_id`),
  KEY `fk_projects_has_users_projects1_idx` (`project_id`),
  CONSTRAINT `fk_projects_has_users_projects1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_projects_has_users_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_has_users`
--

LOCK TABLES `projects_has_users` WRITE;
/*!40000 ALTER TABLE `projects_has_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_has_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tag_id` varchar(45) NOT NULL,
  `tag_name` varchar(45) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `tag_id_UNIQUE` (`tag_id`),
  UNIQUE KEY `tag_name_UNIQUE` (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_messages`
--

DROP TABLE IF EXISTS `user_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_messages` (
  `user_msg_id` varchar(45) NOT NULL,
  `content` varchar(5000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `conversation_id` varchar(45) NOT NULL,
  PRIMARY KEY (`user_msg_id`),
  UNIQUE KEY `user_msg_id_UNIQUE` (`user_msg_id`),
  KEY `fk_user_messages_conversations1_idx` (`conversation_id`),
  CONSTRAINT `fk_user_messages_conversations1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`conversation_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_messages`
--

LOCK TABLES `user_messages` WRITE;
/*!40000 ALTER TABLE `user_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `dob` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('test_user','test_user','test_password','test_email','first','last',NULL,'2024-08-09 04:03:59','2024-08-09 04:03:59');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-29  9:57:51
