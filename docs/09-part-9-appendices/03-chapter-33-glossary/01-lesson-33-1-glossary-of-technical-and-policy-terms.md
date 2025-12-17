---
id: 01-lesson-33-1-glossary-of-technical-and-policy-terms
title: "The Ultimate AI & Agentic Glossary (A-Z)"
sidebar_label: "A-Z Glossary"
---

# The Ultimate AI & Agentic Glossary (A-Z)

A comprehensive reference for terms related to Artificial Intelligence, Autonomous Agents, Robotics, and Ethics.

## A

*   **Action Space:** The set of all possible actions an agent can take in a given environment.
*   **Activation Function:** A mathematical function (like ReLU or Sigmoid) applied to a neural network node's output to introduce non-linearity.
*   **Active Learning:** A training process where the model identifies which data points it finds most confusing and asks a human to label specifically those, optimizing the labeling budget.
*   **Actor-Critic:** A Reinforcement Learning architecture consisting of two networks: the Actor (decides which action to take) and the Critic (estimates the value of that action).
*   **Adversarial Example:** An input designed to cause a model to make a mistake (e.g., adding invisible noise to an image of a panda so the AI calls it a gibbon).
*   **Adversarial Robustness:** The measure of a model's resistance to adversarial attacks.
*   **Agency:** The capacity of an AI system to act independently to achieve a goal.
*   **Agentic Workflow:** A system design where LLMs are capable of iterating, planning, and using tools rather than just outputting text.
*   **AGI (Artificial General Intelligence):** Hypothetical AI that possesses the ability to understand, learn, and apply knowledge across a wide variety of tasks at a human level.
*   **Alignment:** The field of research dedicated to ensuring AI systems pursue goals that match human values.
*   **Alignment Tax:** The hypothetical performance penalty paid by an aligned model compared to an unaligned one (e.g., a model that refuses unsafe answers might be less helpful).
*   **Amortized Inference:** Spreading the cost of learning over many inference steps.
*   **Anchor:** In interpretability, a rule that "anchors" the prediction (e.g., "If income < $10k, predict 'Loan Denied'").
*   **ANN (Artificial Neural Network):** Computing systems inspired by the biological neural networks of animal brains.
*   **Attention Mechanism:** A technique in neural networks that allows the model to focus on specific parts of the input sequence when generating output (e.g., focusing on "cat" when translating "le chat").
*   **Auto-GPT:** An open-source experimental open-source attempt to make GPT-4 fully autonomous.
*   **Autoencoder:** A type of neural network trained to copy its input to its output, useful for dimensionality reduction.
*   **Autonomy Levels:** A classification scale (0-5) for autonomous systems, originating in self-driving cars but applied to agents.
*   **Autoregressive Model:** A model that predicts the next value in a sequence based on previous values (e.g., GPT).

## B

*   **Backpropagation:** The algorithm used to train neural networks, calculating the gradient of the loss function with respect to the weights.
*   **Batch Normalization:** A technique to improve training stability by normalizing layer inputs.
*   **Bayesian Neural Network:** A neural network that uses Bayesian statistics to estimate uncertainty in its predictions.
*   **Beam Search:** A search algorithm used in sequence generation that explores multiple likely paths (beams) rather than just the single best one.
*   **Behavioral Cloning:** A form of Imitation Learning where the agent learns a policy by supervised learning on expert demonstrations.
*   **Bias (Algorithmic):** Systematic and unfair discrimination in the output of an algorithm, often caused by unrepresentative training data.
*   **Bias (Confirmation):** The tendency to search for, interpret, favor, and recall information in a way that confirms various pre-existing beliefs or values.
*   **Bias (Inductive):** The set of assumptions a learner uses to predict outputs for inputs it has not encountered (e.g., CNNs have an inductive bias for spatial locality).
*   **Black Box:** A system whose internal workings are opaque to the user (e.g., a Deep Neural Network).
*   **Blackboard Architecture:** A pattern where multiple specialized agents read and write to a shared memory space ("the blackboard") to solve a problem cooperatively.
*   **Blue-Green Deployment:** A deployment strategy that reduces downtime and risk by running two identical production environments.
*   **Bounded Rationality:** The idea that decision-making is limited by the information available, cognitive limitations, and time.

## C

*   **Capacity:** The ability of a model to fit complex functions, generally related to the number of parameters.
*   **Catastrophic Forgetting:** When a neural network completely forgets previously learned information upon learning new information.
*   **Chain of Density:** A prompting technique to create increasingly dense summaries.
*   **Chain of Thought (CoT):** A prompting technique where the model is asked to "think step by step," improving performance on reasoning tasks.
*   **Chatbot:** A software application used to conduct an on-line chat conversation via text or text-to-speech.
*   **CLIP (Contrastive Language-Image Pre-training):** A model trained to connect text and images.
*   **Cold Start Problem:** The difficulty of making recommendations for new users or items due to lack of historical data.
*   **Computer Vision (CV):** A field of AI that trains computers to interpret and understand the visual world.
*   **Confidence Calibration:** The degree to which a model's predicted probability estimates match the true correctness likelihood.
*   **Constitutional AI:** A method developed by Anthropic for training models using a set of high-level principles (a constitution) rather than human labels.
*   **Content Moderation:** The monitoring and filtering of user-generated content.
*   **Context Window:** The amount of text (measured in tokens) the model can "see" at one time.
*   **Contrastive Learning:** A self-supervised learning technique where the model learns to distinguish between similar and dissimilar data points.
*   **Convolutional Neural Network (CNN):** A class of deep neural networks, most commonly applied to analyzing visual imagery.
*   **Counterfactual:** A thought experiment: "What would have happened if X had not occurred?" Used in explainability.
*   **Cooperation:** In multi-agent systems, the ability of agents to work together for a joint reward.

## D

*   **Data Augmentation:** Techniques used to increase the amount of data by adding slightly modified copies of already existing data (e.g., rotating images).
*   **Data Drift:** When the statistical properties of the input data change over time, degrading model performance.
*   **Data Leakage:** When information from outside the training dataset is used to create the model, leading to overly optimistic performance estimates.
*   **Data Poisoning:** An attack where the attacker corrupts the training data to compromise the model.
*   **Decision Tree:** A decision support tool that uses a tree-like model of decisions and their possible consequences.
*   **Decoding Strategy:** The method used to pick the next token in generation (e.g., Greedy, Nucleus Sampling, Top-K).
*   **Deep Learning:** A subset of Machine Learning based on artificial neural networks with representation learning.
*   **Deepfakes:** Synthetic media in which a person in an existing image or video is replaced with someone else's likeness.
*   **Dense Retrieval:** Using embeddings to search for documents, as opposed to keyword search.
*   **Differential Privacy:** A mathematical framework for sharing aggregate patterns of a dataset without revealing information about any specific individual.
*   **Diffusion Model:** A type of generative model that learns to denoise data, used for high-quality image generation (e.g., Stable Diffusion).
*   **Distillation:** The process of training a smaller student model to mimic the behavior of a larger teacher model.
*   **Domain Adaptation:** The ability of a machine learning algorithm trained in one domain to perform well in another target domain.
*   **Dropout:** A regularization technique where randomly selected neurons are ignored during training to prevent overfitting.

## E

*   **Early Stopping:** A form of regularization used to avoid overfitting when training a learner with an iterative method.
*   **Edge AI:** Running AI algorithms locally on a hardware device (edge), rather than in the cloud.
*   **Eigendecomposition:** Factorization of a matrix into its canonical form.
*   **ELIZA effect:** The tendency to unconsciously assume computer behaviors are analogous to human behaviors.
*   **Embedding:** Vector representations of text or images. Concepts that are semantically similar are close together in vector space.
*   **Embodied AI:** AI agents that interact with a physical environment (e.g., robots).
*   **Ensemble Learning:** Using multiple learning implementations to obtain better predictive performance than could be obtained from any of the constituent learning algorithms alone.
*   **Entropy:** A measure of the unpredictability or information content.
*   **Epoch:** One complete pass through the entire training dataset.
*   **Ethics of AI:** The branch of technoconstructivist ethics specific to artificially intelligent systems.
*   **Evaluation (Eval):** The process of measuring the quality of a model's output.
*   **Evolutionary Algorithms:** Algorithms that mimic the process of natural selection.
*   **Explainable AI (XAI):** AI which can be understood by humans.

## F

*   **F1 Score:** The harmonic mean of precision and recall.
*   **Fairness:** The absence of any prejudice or favoritism toward an individual or a group based on their inherent or acquired characteristics.
*   **Feature Engineering:** The process of using domain knowledge to extract features from raw data.
*   **Feature Store:** A centralized component for data management in MLOps.
*   **Federated Learning:** Training a model across multiple decentralized devices holding local data samples, without exchanging them.
*   **Few-Shot Learning:** The ability of a model to learn a new task with only a small number of examples.
*   **Fine-Tuning:** Taking a pre-trained model and training it further on a specific dataset to specialize it for a task.
*   **Forward Propagation:** The calculation and storage of intermediate variables (including outputs) for a neural network in order from the input layer to the output layer.
*   **Foundation Model:** A model trained on broad data (generally using self-supervision at scale) that can be adapted to a wide range of downstream tasks.
*   **Function Calling:** The ability of an LLM to generate structured output (like JSON) that triggers a specific code function.

## G

*   **GAN (Generative Adversarial Network):** A class of ML frameworks where two neural networks contest with each other in a game.
*   **Gated Recurrent Unit (GRU):** A gating mechanism in recurrent neural networks.
*   **Gaussian Mixture Model:** A probabilistic model that assumes all the data points are generated from a mixture of a finite number of Gaussian distributions.
*   **Generalization:** The ability of a model to adapt properly to new, previously unseen data.
*   **Generative AI:** AI capable of generating text, images, or other media.
*   **Genetic Algorithm:** A search heuristic that is inspired by Charles Darwin's theory of natural evolution.
*   **Gradient Descent:** An optimization algorithm for finding the minimum of a function.
*   **Gradient Explosion:** A problem in training neural networks where gradients accumulate and result in very large updates to weights.
*   **Gradient Vanishing:** A problem in training deep networks where gradients become too small to effectively update weights.
*   **Graph neural network (GNN):** Use of neural networks on graph structures.
*   **Ground Truth:** Information that is known to be real or true, provided by direct observation and measurement.
*   **Grounding:** Connecting the model's output to real-world facts or data (e.g., via RAG) to prevent hallucination.

## H

*   **Hallucination:** When an AI generates factually incorrect or nonsensical information confidently.
*   **Heuristic:** A technique designed for solving a problem more quickly when classic methods are too slow.
*   **Hidden Layer:** A layer of neurons between the input and output layers.
*   **Hidden State:** The internal representation of a model (like an RNN) that captures information from previous time steps.
*   **Hierarchical Reinforcement Learning:** Decomposing a complex RL problem into sub-problems.
*   **Hindsight Experience Replay:** A technique in RL where an agent learns from failures by pretending the reached state was the goal.
*   **Human-in-the-Loop (HITL):** A system design where a human must review or approve the AI's action before it is executed.
*   **Hyperparameter:** A parameter whose value is used to control the learning process (e.g., learning rate).

## I

*   **ImageNet:** A large visual database designed for use in visual object recognition software research.
*   **Imitation Learning:** Learning a policy from demonstrations.
*   **In-Context Learning:** The ability of an LLM to learn from the prompt without weight updates.
*   **Inference:** The process of using a trained model to make a prediction on new data.
*   **Information Retrieval:** Validating if the AI retrieved the correct document.
*   **InstructGPT:** A model fine-tuned with human feedback to follow instructions better than raw GPT-3.
*   **Instruction Tuning:** Fine-tuning a model on a dataset of (instruction, output) pairs.
*   **Interpretable AI:** Systems where the user can understand the cause of a decision.
*   **Inverse Reinforcement Learning:** Deriving a reward function from observed behavior.
*   **IoU (Intersection over Union):** An evaluation metric used to measure the accuracy of an object detector.

## J

*   **Jailbreak:** A prompt designed to bypass the safety filters of an LLM.
*   **Joint Probability:** The probability of two events happening together.
*   **JSON Mode:** A mode in newer LLMs that forces the output to be valid JSON.

## K

*   **K-Means Clustering:** A method of vector quantization, originally from signal processing, that aims to partition n observations into k clusters.
*   **K-Nearest Neighbors (KNN):** A non-parametric classification method.
*   **Kernel Trick:** A method to map data into a higher-dimensional space.
*   **Knowledge Distillation:** See Distillation.
*   **Knowledge Graph:** A structured representation of knowledge using nodes (entities) and edges (relationships).

## L

*   **Labeling:** The process of identifying raw data (images, text, audio, etc.) and adding one or more meaningful and informative labels to provide context.
*   **LangChain:** A framework for developing applications powered by language models.
*   **Large Language Model (LLM):** A deep learning algorithm that can recognize, summarize, translate, predict, and generate text.
*   **Latent Space:** A compressed representation of data.
*   **Learning Rate:** A hyperparameter that controls how much to change the model in response to the estimated error each time the model weights are updated.
*   **LlamaIndex:** A data framework for LLMs to ingest, structure, and access private data.
*   **Long Short-Term Memory (LSTM):** An artificial recurrent neural network (RNN) architecture.
*   **Loss Function:** A function that maps an event or values of one or more variables onto a real number intuitively representing some "cost" associated with the event.

## M

*   **Machine Learning (ML):** The study of computer algorithms that improve automatically through experience.
*   **Machine Unlearning:** The process of removing the influence of specific data points from a trained model.
*   **Markov Decision Process (MDP):** A discrete-time stochastic control process.
*   **Masked Language Modeling:** The training objective of BERT, where tokens are hidden and the model must predict them.
*   **Meta-Learning:** "Learning to learn."
*   **MLOps:** The set of practices that aims to deploy and maintain machine learning models in production reliably and efficiently.
*   **Model Card:** A standardized document describing a model's capabilities, limitations, and intended use.
*   **Model Collapse:** The degradation of models trained on synthetic data generated by other models.
*   **Model Drift:** See Data Drift.
*   **Model Monitoring:** The continuous tracking of model performance in production.
*   **Monte Carlo Tree Search (MCTS):** A heuristic search algorithm for some kinds of decision processes (used in AlphaGo).
*   **MoE (Mixture of Experts):** An architecture where the model is composed of many sub-models (experts), and a gating network chooses which experts to use for each input (used in GPT-4).
*   **Multi-Agent System (MAS):** A computerized system composed of multiple interacting intelligent agents.
*   **Multi-Modal:** Models that can process multiple types of input (text, image, audio) simultaneously.

## N

*   **Natural Language Processing (NLP):** The subfield of linguistics, computer science, and AI concerned with the interactions between computers and human language.
*   **Natural Language Understanding (NLU):** Machine reading comprehension.
*   **Neural Architecture Search (NAS):** The process of automating the design of artificial neural networks.
*   **Neural Radiance Fields (NeRF):** A method for generating novel views of complex 3D scenes.
*   **Neuro-symbolic AI:** Combining neural networks with symbolic logic.
*   **Normalization:** Scaling data to a standard range.
*   **Nucleus Sampling (Top-p):** A decoding strategy where the model samples from the smallest set of tokens whose cumulative probability exceeds probability p.

## O

*   **Object Detection:** A computer vision technique for locating instances of objects in images or videos.
*   **Objective Function:** The function that an algorithm optimizes.
*   **Observer Effect:** In AI, when the act of monitoring the system changes its behavior.
*   **Offline Reinforcement Learning:** Learning a policy from a fixed dataset without interacting with the environment.
*   **One-Shot Learning:** Learning from a single example.
*   **Online Learning:** Learning where data becomes available in a sequential order and is used to update the best predictor for future data.
*   **OpenAI Gym:** A toolkit for developing and comparing reinforcement learning algorithms.
*   **Optimization:** The selection of a best element from some set of available alternatives.
*   **Out-of-Distribution (OOD):** Data that is different from the data the model was trained on.
*   **Overfitting:** The production of an analysis that corresponds too closely or exactly to a particular set of data, and may therefore fail to fit additional data.

## P

*   **Parameter:** A configuration variable that is internal to the model and whose value can be estimated from data.
*   **Parameter Efficient Fine-Tuning (PEFT):** Techniques (like LoRA) to finetune models without updating all parameters.
*   **Perceptron:** An algorithm for supervised learning of binary classifiers.
*   **Perplexity:** A measurement of how well a probability model predicts a sample. Lower is better.
*   **Plan-and-Solve:** A prompting strategy that explicitly asks the model to generate a plan before executing.
*   **Policy (RL):** A strategy used by an agent to determine the next action based on the current state.
*   **Policy Gradient:** A class of reinforcement learning algorithms that optimize the policy directly.
*   **Precision:** The fraction of relevant instances among the retrieved instances.
*   **Pre-training:** The initial training of a model on a large dataset to learn general features.
*   **Principal Component Analysis (PCA):** A dimensionality reduction technique.
*   **Prompt Engineering:** The art of crafting inputs to guide the model to the desired output.
*   **Prompt Injection:** A security attack where the user overrides the system instructions of an LLM.
*   **Pruning:** The process of removing parameters from an existing neural network.

## Q

*   **Q-Learning:** A model-free reinforcement learning algorithm.
*   **Quantization:** Reducing the precision of the numbers used to represent a model's parameters (e.g., from 32-bit float to 8-bit integer) to reduce size and increase speed.
*   **Query Expansion:** Rephrasing or adding terms to a user's query to improve search results.

## R

*   **RAG (Retrieval-Augmented Generation):** A technique where an LLM is provided with external data (retrieved from a database) to answer questions.
*   **Random Forest:** An ensemble learning method for classification, regression and other tasks.
*   **ReAct (Reason + Act):** A paradigm where agents interleave reasoning traces and action execution.
*   **Recall:** The fraction of relevant instances that have been retrieved over the total amount of relevant instances.
*   **Recommendation System:** A subclass of information filtering system that seeks to predict the "rating" or "preference" a user would give to an item.
*   **Recurrent Neural Network (RNN):** A class of artificial neural networks where connections between nodes form a directed graph along a temporal sequence.
*   **Red Teaming:** The practice of rigorously challenging plans, policies, systems and assumptions by adopting an adversarial approach.
*   **Regularization:** A process of introducing additional information in order to solve an ill-posed problem or to prevent overfitting.
*   **Reinforcement Learning (RL):** An area of machine learning concerned with how intelligent agents ought to take actions in an environment in order to maximize the notion of cumulative reward.
*   **Reinforcement Learning from Human Feedback (RLHF):** Training models by using human feedback to define the reward signal.
*   **Representational Drift:** See Data Drift.
*   **Reward Function:** The mathematical formula that determines the numerical score an agent receives for an action.
*   **Reward Hacking:** When an agent finds a way to maximize the reward function without actually achieving the intended goal (e.g., a vacuum robot sweeping dirt under the rug).
*   **RNN (Recurrent Neural Network):** See Recurrent Neural Network.
*   **Robustness:** The ability of a computer system to cope with errors during execution.
*   **ROC Curve (Receiver Operating Characteristic):** A graphical plot that illustrates the diagnostic ability of a binary classifier system.

## S

*   **Scaling Laws:** Empirical relationships between the performance of a model and the scale of compute/data/parameters (e.g., "Performance improves as a power law of compute").
*   **Self-Attention:** A mechanism relating different positions of a single sequence in order to compute a representation of the sequence.
*   **Self-Supervised Learning:** Learning where the data itself provides the supervision (e.g., masking words).
*   **Semantic Search:** Search that considers the intent and contextual meaning of terms.
*   **Sentiment Analysis:** The use of natural language processing to identify and extract subjective information in source materials.
*   **Sequence-to-Sequence (Seq2Seq):** A family of machine learning models that map an input sequence to an output sequence.
*   **Sigmoid Function:** A mathematical function having a characteristic "S"-shaped curve.
*   **Sim2Real:** Transferring knowledge learned in a simulation to the real world.
*   **Singularity:** A hypothetical point in time at which technological growth becomes uncontrollable and irreversible.
*   **Softmax Function:** A function that turns a vector of K real values into a vector of K real values that sum to 1.
*   **Sparse Vector:** A vector where most dimensions are zero.
*   **Stochastic Gradient Descent (SGD):** An iterative method for optimizing an objective function.
*   **Supervised Learning:** The machine learning task of learning a function that maps an input to an output based on example input-output pairs.
*   **Support Vector Machine (SVM):** Supervised learning models with associated learning algorithms that analyze data for classification and regression analysis.
*   **Synthetic Data:** Data that is generated artificially rather than by real-world events.
*   **System Prompt:** The initial set of instructions given to an LLM that defines its persona and constraints.

## T

*   **Temperature:** A hyperparameter that controls the randomness of an LLM's output. Higher temperature = more random.
*   **Tensor:** A multidimensional array of numerical values.
*   **Token:** A chunk of text (word or sub-word) used as the basic unit of processing for an LLM.
*   **Tokenizer:** The tool that breaks text into tokens.
*   **Tool Use:** The ability of an agent to call external APIs (calculator, search, database).
*   **ToT (Tree of Thoughts):** A framework that generalizes Chain of Thought prompting and enables exploration over coherent units of text (thoughts) that serve as intermediate steps toward problem solving.
*   **Training Data:** The dataset used to fit the model.
*   **Transfer Learning:** A research problem in machine learning that focuses on storing knowledge gained while solving one problem and applying it to a different but related problem.
*   **Transformer:** A deep learning model that adopts the mechanism of self-attention, differentially weighting the significance of each part of the input data.
*   **Turing Test:** A test of a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human.

## U

*   **U-Net:** A convolutional neural network that was developed for biomedical image segmentation.
*   **Underfitting:** Occurs when a model is too simple to capture the underlying structure of the data.
*   **Unsupervised Learning:** A type of machine learning algorithm used to draw inferences from datasets consisting of input data without labeled responses.
*   **Utility Function:** A mathematical function that ranks alternatives according to their desirability.

## V

*   **Validation Set:** A set of examples used to tune the parameters of a classifier.
*   **Vanishing Gradient:** See Gradient Vanishing.
*   **Variational Autoencoder (VAE):** A generative model.
*   **Vector Database:** A database optimized for storing and querying high-dimensional vectors (embeddings).
*   **Vision Transformer (ViT):** An architecture that applies transformers to image classification.

## W

*   **Weights:** The learnable parameters of a neural network.
*   **Word Embedding:** The collective name for a set of language modeling and feature learning techniques in natural language processing where words or phrases from the vocabulary are mapped to vectors of real numbers.
*   **World Model:** An internal representation of the environment that allows an agent to simulate the consequences of its actions.

## X

*   **X-Risk (Existential Risk):** The risk that AI could cause the extinction of humanity or the permanent collapse of civilization.
*   **XAI:** See Explainable AI.

## Z

*   **Zero-Shot Learning:** The ability of a model to perform a task it was not explicitly trained to do.
*   **Zero-Shot Prompting:** Asking the model to do something without providing examples.
*   **Zero Trust:** A security framework that assumes no user or system is trusted by default, even inside the network perimeter.
